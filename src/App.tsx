import React, { useState, MouseEvent, FormEvent, ChangeEvent } from "react";
import { clientsData, clientsType } from "./utils/data";

import "./App.css";

function App() {
  const [data, setData] = useState<clientsType[]>(clientsData);
  const [toggleEditForm, setToggleEditForm] = useState<boolean>(false);
  const [userEditId, setUserEditId] = useState<number>(0);
  const [editInput, setEditInput] = useState<clientsType>({
    id: 0,
    name: "",
    date: "",
    email: "",
    status: "ACTIVE",
  });

  const toggleEditor = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { dataset } = e.currentTarget;
    const userId = Number(dataset.userid);
    setUserEditId(userId);
    setToggleEditForm(true);
    const findClient = data.find((client) => client.id === userId);
    findClient && setEditInput(findClient);
  };

  const handleEditForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setEditInput((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleEditFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (toggleEditForm) {
      const filterCurrentData: clientsType[] = data.filter(
        (client) => client.id !== userEditId
      );
      setData([...filterCurrentData, editInput]);
    }
  };

  return (
    <div className="App">
      <table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {data.map((client) => (
          <tr key={client.id}>
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
      <br />
      <hr />

      {toggleEditForm && (
        <div>
          <form role="edit">
            <label htmlFor="name"> Name </label>
            <input
              id="name"
              name="name"
              value={editInput?.name}
              onChange={(e) => handleEditForm(e)}
              type="text"
            ></input>
            <label htmlFor="email"> Email </label>
            <input
              id="email"
              name="email"
              value={editInput?.email}
              onChange={(e) => handleEditForm(e)}
              type="text"
            ></input>
            <label htmlFor="birthday"> Birthday </label>
            <input
              id="birthday"
              name="date"
              value={editInput?.date}
              onChange={(e) => handleEditForm(e)}
              type="date"
            ></input>
            <label htmlFor="status"> Status </label>
            <select
              id="status"
              name="status"
              value={editInput?.status}
              onChange={(e) => handleEditForm(e)}
            >
              <option value={"ACTIVE"}>ACTIVE</option>
              <option value={"PENDING"}>PENDING</option>
              <option value={"BLOCKED"}>BLOCKED</option>
            </select>
            <button onClick={handleEditFormSubmit}>Save edits</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
