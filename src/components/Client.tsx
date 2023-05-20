import { useState, MouseEvent, ChangeEvent } from "react";
import { clientsType } from "../utils/data";

interface clientProp {
  data: clientsType[] | undefined;
  isResultFound: boolean;
  toggleEditor: (e: MouseEvent<HTMLAnchorElement>) => void;
}

function Client({ data, isResultFound, toggleEditor }: clientProp) {
  return (
    <>
      <table className="styled-table" border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {!isResultFound ? (
          <tr>
            <td>"No result found"</td>
          </tr>
        ) : (
          data?.map((client) => (
            <tbody>
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.status}</td>
                <td>
                  <a
                    role="button"
                    href="#"
                    data-userid={client.id}
                    onClick={(e) => {
                      toggleEditor(e);
                    }}
                  >
                    edit
                  </a>
                </td>
              </tr>
            </tbody>
          ))
        )}
      </table>
    </>
  );
}

export default Client;
