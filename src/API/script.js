const clientId = "30f051c5fe2146e5afeb4153911bdb99";
const redirectUri =
  // "http://localhost:5173/home" || //only apply when working locally
  "https://ornate-meerkat-7bb6c1.netlify.app/home";
const url = "https://accounts.spotify.com/api/token";
const scope =
  "user-read-playback-state user-modify-playback-state streaming user-read-private user-read-email";
const authUrl = new URL("https://accounts.spotify.com/authorize");

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const codeVerifier = generateRandomString(64);

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
const generateCodeChallenge = async () => {
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  return codeChallenge;
};
export const getCode = async () => {
  window.localStorage.setItem("code_verifier", codeVerifier);
  const codeChallenge = await generateCodeChallenge();
  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("code");

export const getToken = async () => {
  const codeVerifier = localStorage.getItem("code_verifier");
  try {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();

    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
  } catch (error) {
    console.error("Error Fetching Token", error);
    throw error;
  }
};

if (code) {
  try {
    getToken();
  } catch (error) {
    console.error("Error Fetching Token");
  }
}

export async function fetchProfile(token) {
  try {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = result.json();
    return response;
  } catch (error) {
    console.error("Error fetching profile", error);
    throw error;
  }
}

export async function fetchPlaylistTracks(token) {
  try {
    const result = await fetch(
      "https://api.spotify.com/v1/playlists/37i9dQZF1DWVS1recTqXhf/tracks",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await result.json();
    return response;
  } catch (error) {
    console.error("Error Fetching Playlist Tracks", error);
    throw error;
  }
}

export async function fetchMeditationById(id, token) {
  try {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error("Error Fetching Meditation By Id", error);
    throw error;
  }
}

const refreshTokenThreshold = 3600;

const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      cache: "no-cache",
    }),
  };
  try {
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem("access_token", response.accessToken);
    localStorage.setItem("refresh_token", response.refreshToken);
    setTimeout(getRefreshToken, refreshTokenThreshold * 1000);
  } catch (error) {
    console.error("Error Refreshing Token", error);

    setTimeout(getRefreshToken, 5000);
  }
};

setTimeout(getRefreshToken, refreshTokenThreshold * 1000);
