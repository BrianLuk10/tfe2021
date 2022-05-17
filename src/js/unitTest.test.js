import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReactDOM from "react-dom";
import * as React from "react";
import App from "./App";
import { MemoryRouter } from "react-router";
import Caisse from "../components/caisse/Caisse";
import Confirmer from "../components/modifierProduit/Confirmer";
import renderer from "react-test-renderer";
import ModifierProduit from "../components/modifierProduit/modifierProduit";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App></App>, div);
});

test("Page caisse", () => {
  render(
    <MemoryRouter>
      <Caisse></Caisse>
    </MemoryRouter>
  );
  const divText = screen.getByTestId("Test");
  expect(divText).not.toBeNull();
  expect(divText).toBeInTheDocument();
  expect(divText).toHaveTextContent("Total à payer: ");
});

test("message de confirmation", () => {
  const confirmer = () => {
    console.log("test");
  };
  const valeurTrue = true;
  render(<Confirmer show={valeurTrue} confirmer={confirmer}></Confirmer>);
  const divElement = screen.getByText("Action effectué");
  expect(divElement).not.toBeNull();
});

test(" match snapshot Confirmer", () => {
  const confirmer = () => {
    console.log("test");
  };
  const tree = renderer
    .create(<Confirmer show={true} confirmer={confirmer}></Confirmer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("valeur dans recherche", () => {
  it("changer valeur de la barre de recherche", () => {
    const { queryByPlaceholderText } = render(
      <MemoryRouter>
        <ModifierProduit></ModifierProduit>
      </MemoryRouter>
    );
    const searchInput = queryByPlaceholderText("Rechercher...");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });
});
