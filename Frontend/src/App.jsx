import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  
  const navigate = useNavigate();

  function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function login() {
      const payload = { email, password };
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(payload),
        credentials : 'include',
      });
      const data = await res.json();
      if (res.status == 200) {
        console.log(res.status);
        return navigate("/users", { replace: true, state: {token: data.token} },);
      }
    }

    return (
      <>
        <p style={{ fontWeight: "bold", fontSize: "26px" }}>
          Login To Your Account
        </p>
        <div id="inputContainer">
          <label id="inputLabel" htmlFor="">
            Email or Username
          </label>
          <input
            className="loginInput"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label id="inputLabel" htmlFor="">
            Password
          </label>
          <input
            className="loginInput"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            className="loginInput"
            id="loginButton"
            onClick={() => login()}
          >
            Login
          </button>
          <a href="/register">Don't have an account? Register</a>
        </div>
      </>
    );
  }
  return <div id="loginContainer"><Login /></div>;
}

export default App;
