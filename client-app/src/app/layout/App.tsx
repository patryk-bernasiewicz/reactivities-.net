import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";

import HomePage from "../../features/home/HomePage";

import Navbar from "./Navbar";
import "./styles.css";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <Navbar />
          <Container style={{ marginTop: "6rem" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

const ObservedApp = observer(App);

export default ObservedApp;
