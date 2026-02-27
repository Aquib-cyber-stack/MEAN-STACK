import { IUser } from "./userInterface";

export interface IAuth {
  status: string;
  data: {
    token: string;
    user: IUser;
  };
}
