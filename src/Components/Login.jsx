import { getCode } from "../API/script";

export default function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();
    await getCode();
  };

  return (
    <div className="login">
      <h2 className="login-header text-3xl">Login</h2>

      <form onSubmit={handleLogin} className="login-form">
        <div className="login-input">Login With Spotify</div>
        <button className="login-button">Submit</button>
      </form>
    </div>
  );
}
