import { useState, MouseEvent, ChangeEvent, ReactElement } from "react";
import { clientsData } from "../data/data";
import { clientsType } from "../types/clientProps";
import Client from "../components/Client";

const Home: React.FC = (): ReactElement => {
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
  const [currentData, setCurrentData] = useState<clientsType[]>(clientsData);
  const [fliterSortInput, setFilterSortInput] = useState({
    filterBy: "none",
    sortBy: "none",
  });

  const toggleEditor = (e: MouseEvent<HTMLButtonElement>) => {
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

    if (!toggleForm) return;

    if (isNewUser) {
      submitNewClient();
    } else {
      submitEditedClient();
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
    resetFilteredSortInput();
  };

  const submitNewClient = () => {
    const userId = Math.floor(Math.random() * 1000);

    setData([...data, { ...editInput, id: userId }]);
    setCurrentData([...data, { ...editInput, id: userId }]);
    setIsNewUser(false);
    setToggleForm(false);
    resetFilteredSortInput();
  };

  const resetFilteredSortInput = () => {
    setFilterSortInput({
      filterBy: "none",
      sortBy: "none",
    });
  };

  const search = (data: clientsType[], searchQuery: string) => {
    if (searchQuery === "") return data;

    if (!searchQuery.match(/^\S+@\S+\.\S+$/)) return;

    const searchResult: clientsType | undefined = data.find(
      (client) => client.email === searchQuery
    );

    return searchResult !== undefined ? [searchResult] : [];
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchInput(searchQuery);
    const searchResult = search(data, searchQuery);

    if (searchResult !== undefined) {
      setCurrentData(searchResult);
    }
  };

  const filterClient = (status: string, data: clientsType[]) => {
    return status === "none"
      ? data
      : data.filter((result) => result.status === status);
  };

  const handleFilterResult = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.currentTarget.value;

    setFilterSortInput({ ...fliterSortInput, filterBy: status });

    const filteredData = filterClient(status, data);
    setCurrentData(filteredData);
  };

  const sortData = (sortBy: string, data: clientsType[]) => {
    if (sortBy === "none") return data;

    return sortBy === "z-a"
      ? data.sort(function (a, b) {
          return a.name
            .toLocaleLowerCase()
            .localeCompare(b.name.toLocaleLowerCase());
        })
      : data.sort(function (a, b) {
          return b.name
            .toLocaleLowerCase()
            .localeCompare(a.name.toLocaleLowerCase());
        });
  };

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.currentTarget.value;

    setFilterSortInput({ ...fliterSortInput, sortBy: sortBy });

    const existingData = [...currentData];
    const sortedData: clientsType[] = sortData(sortBy, existingData);
    console.log(sortedData);
    setCurrentData(sortedData);
  };

  return (
    <div className="App">
      <label htmlFor="filter"> Filter by:</label>
      <select
        value={fliterSortInput.filterBy}
        name="filterBy"
        onChange={(e) => handleFilterResult(e)}
      >
        <option>none</option>
        <option>ACTIVE</option>
        <option>PENDING</option>
        <option>BLOCKED</option>
      </select>

      <label htmlFor="sort"> Sort by:</label>
      <select
        value={fliterSortInput.sortBy}
        name="sortBy"
        onChange={(e) => handleSort(e)}
      >
        <option value="none">none</option>
        <option value="a-z">A to Z</option>
        <option value="z-a">Z to A</option>
      </select>
      <Client data={currentData} toggleEditor={toggleEditor} />
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
            <br />
            <br />
            <label htmlFor="email"> Email </label>
            <input
              id="email"
              name="email"
              value={editInput?.email}
              onChange={(e) => handleForm(e)}
              type="email"
            ></input>
            <label htmlFor="birthday"> Birthday </label>
            <input
              id="birthday"
              name="date"
              value={editInput?.date}
              onChange={(e) => handleForm(e)}
              type="date"
            ></input>
            <br />
            <br />
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
            <br />
            <br />
            <button onClick={handleFormSubmit}>Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;