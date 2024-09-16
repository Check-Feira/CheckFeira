import { useContext } from "react";
import { UserAuthContext } from "../Contexts";

export function useAuth() {
  return useContext(UserAuthContext);
}