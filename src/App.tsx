import React, { useState } from "react";
import { clientsData, clientsType } from "./utils/data";

import "./App.css";

function App() {
  const [data, setData] = useState<clientsType[]>(clientsData);
  const [toggleEditForm, setToggleEditForm] = useState<boolean>(false);
  const [userEditId, setUserEditId] = useState<number>(0);

  const toggleEditor = (e: any) => {
    e.preventDefualt();
    const userId = e.target.dataset.id;
    setUserEditId(userId);
    setToggleEditForm((prev) => !prev);
  };
  return (
    <div className="App">
      <table border={1}>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {data.map((client) => (
          <tr>
            <td>{client.id}</td>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.status}</td>
            <td>
              <a
                data-userid={client.id}
                onClick={(e) => {
                  toggleEditor(e);
                }}
              >
                edit
              </a>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
