import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { IUser, IUserAuthContext } from "@/Types";

export const UserAuthContext = createContext({} as IUserAuthContext);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);


  useEffect(() => {
    const userToken = localStorage.getItem('user_token');
    const usersDB = localStorage.getItem('users_db');

    if (userToken && usersDB) {
      const users = JSON.parse(usersDB);
      const userTokenActive = JSON.parse(userToken);

      const hasUser = users.filter((user: IUser) => user.email === userTokenActive.email);

      if (hasUser) setUser(hasUser[0]);
    }
  }, [])

  function signin(email: string, password: string): void | string {
    const usersDB = JSON.parse(localStorage.getItem("users_db") || "[]");

    const hasUser: IUser[] = usersDB?.filter((user: IUser) => user.email === email);

    if (hasUser.length) {
      if (hasUser[0]?.email === email && hasUser[0].password === password) {
        const newToken = Math.random().toString(36).substring(2);

        localStorage.setItem("user_token", JSON.stringify({ email, newToken }));
        setUser({ email, password });

        return;
      } else {
        return "E-mail ou senha incorreto";
      }
    } else {
      return "Desculpe, não encontramos uma conta com esse endereço de email. Tente novamente ou crie um nova conta.";
    }
  }

  function signup(email: string, password: string): void | string {
    const usersDB = JSON.parse(localStorage.getItem("users_db") || "[]");

    const hasUser = usersDB?.filter((user: IUser) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail.";
    }

    let newUser: IUser[];

    if (usersDB) {
      newUser = [...usersDB, { email, password }];
    } else {
      newUser = [{ email, password }]
    }

    localStorage.setItem("users_db", JSON.stringify(newUser));

    return;
  }

  function signout() {
    setUser(null);
    localStorage.removeItem("user_token");
  }

  const memoValues = useMemo(() => (
    { user, signed: !!user, signin, signup, signout }
  ), [user]);

  return (
    <UserAuthContext.Provider value={memoValues}>
      {children}
    </UserAuthContext.Provider>
  )
}