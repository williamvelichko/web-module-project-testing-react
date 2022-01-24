import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

const mockShow = {
  name: "flash",
  summary: "fastest guy in the world",
  seasons: [
    { name: "season1", id: 1, episodes: [] },
    { name: "season2", id: 2, episodes: [] },
    { name: "season3", id: 3, episodes: [] },
  ],
};

test("renders without errors", () => {
  render(<Show show={mockShow} selectedSeason={"none"} />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);

  const loading = screen.getByTestId("loading-container");
  //console.log(loading);

  expect(loading).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={mockShow} selectedSeason={"none"} />);

  const seasons = screen.getAllByTestId("season-option");
  // console.log(seasons);

  expect(seasons).toHaveLength(3);
});

test("handleSelect is called when an season is selected", () => {
  const handleSelect = jest.fn();

  render(
    <Show show={mockShow} selectedSeason={"none"} handleSelect={handleSelect} />
  );

  const selectSeason = screen.getByLabelText(/select a season/i);
  //console.log(selectSeason);
  userEvent.selectOptions(selectSeason, ["1"]);

  expect(handleSelect).toBeCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const { rerender } = render(<Show show={mockShow} selectedSeason={"none"} />);

  let episodes = screen.queryByTestId("episodes-container");
  //console.log(episodes);
  expect(episodes).not.toBeInTheDocument();

  rerender(<Show show={mockShow} selectedSeason={1} />);

  episodes = screen.queryByTestId("episodes-container");
  // console.log(episodes);
  expect(episodes).toBeInTheDocument();
});
