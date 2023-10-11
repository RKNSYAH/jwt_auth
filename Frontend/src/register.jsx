import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPass] = useState("");

    const navigate = useNavigate();


    async function register() {
        const payload = {name, email, password, confirmPassword };
        const res = await fetch("http://localhost:5000/user", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if(res.status == 200){
          console.log(res.status)
          return navigate("/", {replace: true})
        }
      }

  return (
    <>
      <div id="loginContainer">
        <div id="inputContainer">
          <label id="inputLabel" htmlFor="">
            Name
          </label>
          <input
            className="loginInput"
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label id="inputLabel" htmlFor="">
            Email
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
          <label id="inputLabel" htmlFor="">
            Confirm Password
          </label>
          <input
            className="loginInput"
            type="password"
            onChange={(e) => setConfirmPass(e.target.value)}
          ></input>
          <button
            className="loginInput"
            id="loginButton"
            onClick={() => register()}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
