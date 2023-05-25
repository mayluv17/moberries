import React, { ReactElement } from "react";
import { MouseEvent } from "react";
import { clientsType } from "../types/clientProps";

interface clientProp {
  data: clientsType[] | undefined;
  toggleEditor: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Client: React.FC<clientProp> = ({ data, toggleEditor }): ReactElement => {
  return (
    <>
      <table className="styled-table" border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Birthday</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!data?.length ? (
            <tr>
              <td colSpan={5}>"No result found"</td>
            </tr>
          ) : (
            data?.map((client, key) => (
              <tr key={client.id}>
                <td>{key + 1}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.status}</td>
                <td>{client.date}</td>
                <td>
                  <button
                    data-userid={client.id}
                    onClick={(e) => {
                      toggleEditor(e);
                    }}
                  >
                    edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Client;
