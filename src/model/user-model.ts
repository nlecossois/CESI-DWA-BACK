import { UserType } from "./user-type";

export interface User {
  id?: string | null;
  name: string;
  email: string;
  password: string;
  type: UserType;
  createdAt?: Date;
  editedAt?: Date;
}
