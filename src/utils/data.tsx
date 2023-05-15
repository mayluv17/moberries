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
    date: "10/12/1992",
    email: "mayowaibrahim009@gmail.com",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "John Doe",
    date: "11/2/2006",
    email: "johndoe@gmail.com",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Mark Silvester",
    date: "11/2/2006",
    email: "johndoe@gmail.com",
    status: "PENDING",
  },
];
