export interface clientsType {
  id: number;
  name: string;
  date: string;
  email: string;
  status: "ACTIVE" | "PENDING" | "BLOCKED";
}
