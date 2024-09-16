import { IUser } from "./User.interface";

export interface IUserAuthContext {
  user: IUser | null;
  signed: boolean;
  signin: (email: string, password: string) => void | string;
  signup: (email: string, password: string) => void | string;
  signout: () => void;
}