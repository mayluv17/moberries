import { useState, MouseEvent, ChangeEvent } from "react";
import { clientsData, clientsType } from "./utils/data";
import "./App.css";
import Client from "./components/Client";

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
  const [searchInput, setSearchInput] = useState("");
  const [isResultFound, setIsResultFound] = useState<boolean>(true);
  const [currentData, setCurrentData] = useState<clientsType[]>(clientsData);

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
    setCurrentData([...filterCurrentData, editInput]);
    setToggleForm(false);
  };

  const submitNewClient = () => {
    const userId = Math.floor(Math.random() * 1000);
    setData([...data, { ...editInput, id: userId }]);
    setCurrentData([...data, { ...editInput, id: userId }]);
    setIsNewUser(false);
    setToggleForm(false);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchInput(searchQuery);
    if (searchQuery !== "") {
      const searchResult: clientsType | undefined = data.find(
        (client) => client.email === searchQuery
      );
      if (searchResult) {
        setCurrentData([searchResult]);
        setIsResultFound(true);
      } else {
        setIsResultFound(false);
      }
    } else {
      setCurrentData([]);
      setIsResultFound(true);
    }
  };

  const handleFilterResult = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.currentTarget.value;
    if (status === "none") {
      setCurrentData(data);
    } else {
      const filteredData = data.filter((result) => result.status === status);
      setCurrentData(filteredData);
    }
  };

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.currentTarget.value;

    if (sortBy === "none") return setCurrentData(data);

    const existing = [...currentData];
    let sortedData: clientsType[] = [];

    if (sortBy === "a-z") {
      sortedData = existing.sort(function (a, b) {
        return a.name
          .toLocaleLowerCase()
          .localeCompare(b.name.toLocaleLowerCase());
      });
    }

    if (sortBy === "z-a") {
      sortedData = existing.sort(function (a, b) {
        return b.name
          .toLocaleLowerCase()
          .localeCompare(a.name.toLocaleLowerCase());
      });
    }
    setCurrentData(sortedData);
  };

  return (
    <div className="App">
      <label htmlFor="filter"> Filter by:</label>
      <select name="filter" onChange={(e) => handleFilterResult(e)}>
        <option>none</option>
        <option>ACTIVE</option>
        <option>PENDING</option>
        <option>BLOCK</option>
      </select>

      <label htmlFor="sort"> Sort by:</label>
      <select name="sort" onChange={(e) => handleSort(e)}>
        <option value="none">none</option>
        <option value="a-z">A to Z</option>
        <option value="z-a">Z to A</option>
      </select>
      <Client
        data={currentData}
        isResultFound={isResultFound}
        toggleEditor={toggleEditor}
      />
      <br />
      <button onClick={handleAddNewClient}>Add user</button>
      <hr />
      <input
        placeholder="search Client"
        type="search"
        onChange={handleSearch}
        value={searchInput}
      />
      <hr />

      {toggleForm && (
        <div>
          <form>
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
