import { Outlet } from "react-router-dom";
import './DefaultLayout.css'

import { Header } from "../Header";

// bootstrap components
import Container from "react-bootstrap/esm/Container";

export function DefaultLayout() {
  return (
    <Container className="vh-100 pt-1 d-flex flex-column">
      <Header />
      <Outlet />
    </Container>
  )
}