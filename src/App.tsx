import React, { useState, MouseEvent, FormEvent, ChangeEvent } from "react";
import { clientsData, clientsType } from "./utils/data";

import "./App.css";

function App() {
  const defaultData: clientsType = {
    id: Math.floor(Math.random() * 1000),
    name: "",
    date: "",
    email: "",
    status: "ACTIVE",
  };
  const [data, setData] = useState<clientsType[]>(clientsData);
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [userEditId, setUserEditId] = useState<number>(0);
  const [editInput, setEditInput] = useState<clientsType>(defaultData);

  const toggleEditor = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsNewUser(false);
    const { dataset } = e.currentTarget;
    const userId = Number(dataset.userid);
    setUserEditId(userId);
    setToggleForm(true);
    const findClient = data.find((client) => client.id === userId);
    findClient && setEditInput(findClient);
  };

  const handleForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setEditInput((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (toggleForm && !isNewUser) {
      submitEditedClient();
    }
    if (toggleForm && isNewUser) {
      submitNewClient();
    }
  };

  const handleAddNewClient = () => {
    setEditInput(defaultData);
    setIsNewUser(true);
    setToggleForm(true);
  };

  const submitEditedClient = () => {
    const filterCurrentData: clientsType[] = data.filter(
      (client) => client.id !== userEditId
    );
    setData([...filterCurrentData, editInput]);
    setToggleForm(false);
  };

  const submitNewClient = () => {
    setData([...data, { ...editInput, id: Math.floor(Math.random() * 1000) }]);
    setIsNewUser(false);
    setToggleForm(false);
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
      <button onClick={handleAddNewClient}>Add user</button>
      <hr />

      {toggleForm && (
        <div>
          <form role="edit">
            <label htmlFor="name"> Name </label>
            <input
              id="name"
              name="name"
              value={editInput?.name}
              onChange={(e) => handleForm(e)}
              type="text"
            ></input>
            <label htmlFor="email"> Email </label>
            <input
              id="email"
              name="email"
              value={editInput?.email}
              onChange={(e) => handleForm(e)}
              type="text"
            ></input>
            <label htmlFor="birthday"> Birthday </label>
            <input
              id="birthday"
              name="date"
              value={editInput?.date}
              onChange={(e) => handleForm(e)}
              type="date"
            ></input>
            <label htmlFor="status"> Status </label>
            <select
              id="status"
              name="status"
              value={editInput?.status}
              onChange={(e) => handleForm(e)}
            >
              <option value={"ACTIVE"}>ACTIVE</option>
              <option value={"PENDING"}>PENDING</option>
              <option value={"BLOCKED"}>BLOCKED</option>
            </select>
            <button onClick={handleFormSubmit}>Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
