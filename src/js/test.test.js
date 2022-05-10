import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import Connexion from "../components/connexion/Connexion";
import Dashboard from "../components/dashbord/Dashboard";
import { MemoryRouter } from "react-router";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App></App>, div);
});

test("button de connexion", () => {
  render(<Connexion></Connexion>);
  const buttonElement = screen.getByText("Valider");
  expect(buttonElement).toBeInTheDocument();
});
/*
test("caisse", () => {
  render(
    <MemoryRouter>
      <Dashboard></Dashboard>
    </MemoryRouter>
  );
  const spy = jest.spyOn(Dashboard.WrappedComponent, "componentDidMount");
  expect(spy).toBe(true);
});
*/
