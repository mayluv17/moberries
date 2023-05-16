//(ACTIVE, PENDING, BLOCKED)

export interface clientsType {
  id: number;
  name: string;
  date: string;
  email: string;
  status: "ACTIVE" | "PENDING" | "BLOCKED";
}
export const clientsData: clientsType[] = [
  {
    id: 1,
    name: "Ibrahim Abdulganiy",
    date: "2017-04-01",
    email: "mayowaibrahim009@gmail.com",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "John Doe",
    date: "2004-08-01",
    email: "johndoe@gmail.com",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Mark Silvester",
    date: "1972-12-23",
    email: "johndoe@gmail.com",
    status: "PENDING",
  },
];
