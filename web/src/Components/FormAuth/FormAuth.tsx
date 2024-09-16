import { ReactElement } from "react";
import { useLocation } from "react-router-dom"

// components
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

//bootstrap components
import Container from "react-bootstrap/esm/Container";
import { Header } from "./Header";

export function FormAuth() {
  const { pathname } = useLocation();

  const handleFormType = (currPath: string): ReactElement => {
    switch (currPath) {
      case '/register':
        return <SignUp />;
      case '/login':
        return <SignIn />;
      default:
        return <SignIn />;
    }
  };

  return (
    <Container className="vh-100 pt-1 d-flex flex-column">
      <Header />
      {handleFormType(pathname)}
    </Container>
  )
}