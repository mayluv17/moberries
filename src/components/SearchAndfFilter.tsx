import { ChangeEvent } from "react";

interface Searcandfilterprop {
  handleSort: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
  handleFilterResult: (e: ChangeEvent<HTMLSelectElement>) => void;
  fliterSortInput: {
    filterBy: string;
    sortBy: string;
  };
}
const Searcandfilter = (props: Searcandfilterprop) => {
  const {
    handleSort,
    handleSearch,
    searchInput,
    fliterSortInput,
    handleFilterResult,
  } = props;

  return (
    <>
      <input
        placeholder="search Client"
        type="search"
        onChange={handleSearch}
        value={searchInput}
      />
      <hr />
      <br />
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

      <br />
    </>
  );
};

export default Searcandfilter;
