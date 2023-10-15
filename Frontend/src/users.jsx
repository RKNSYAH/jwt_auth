import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Users() {
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const { token } = state;
  const [accessToken, setAccessToken] = useState(token);
  const [name, setName] = useState("");
  const [expire, setExpire] = useState('')
  async function fetchUser() {
    const res = await fetchJWT("http://localhost:5000/user", {
      headers: { Authorization: "Bearer " + accessToken },
    });
    const userData = await res.json();
    if (res.status === 200) setData(userData);
  }

  async function refreshToken() {
    try {
      const tokenRes = await fetch("http://localhost:5000/token", {
        method: "GET",
        credentials: "include",
      });
      const data = await tokenRes.json();
      setAccessToken(data);
      const decoded = jwtDecode(data);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchJWT (url, options) {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await fetch('http://localhost:5000/token', {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setAccessToken(data);
      const decoded = jwtDecode(data);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
  
    return fetch(url, options);
  };

  useEffect(() => {
    refreshToken();
    fetchUser();
  }, []);

  return (
    <>
      <div id="userContainer">
        <h2>Welcome : {name}</h2>
        <button onClick={fetchUser}>Refresh</button>
        <div id="tableContainer">
          <table id="mainTable">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
