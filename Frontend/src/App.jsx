import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  async function login() {
    const payload = { email, password };
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if(res.status == 200){
      console.log(res.status)
      return navigate("/users", {replace: true})
    }
  }

  return (
    <>
      <div id="loginContainer">
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
        </div>
      </div>
    </>
  );
}

export default App;
