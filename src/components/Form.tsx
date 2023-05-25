import { ChangeEvent, MouseEvent } from "react";
import { clientsType } from "../types/clientProps";

interface formType {
  handleForm: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  editInput: clientsType;
  handleFormSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Form = (props: formType) => {
  const { handleForm, editInput, handleFormSubmit } = props;
  return (
    <>
      <div>
        <form>
          <label htmlFor="name"> Name </label>
          <input
            id="name"
            name="name"
            value={editInput?.name}
            onChange={(e) => handleForm(e)}
            type="text"
            required
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
            required
          ></input>
          <label htmlFor="birthday"> Birthday </label>
          <input
            id="birthday"
            name="date"
            value={editInput?.date}
            onChange={(e) => handleForm(e)}
            type="date"
            required
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
    </>
  );
};
