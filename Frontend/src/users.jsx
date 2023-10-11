import { useEffect, useState } from "react";

function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("http://localhost:5000/user");
      const userData = await res.json();

      setData(userData);
    }
    fetchUser();
  }, []);

  return (
    <>
      <div id="userContainer">
        <header id="mainHeader">
          <div>
            <div>
              <a href="/">Home</a>
            </div>
          </div>
        </header>
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
                  <tr>
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
