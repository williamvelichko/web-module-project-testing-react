import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "./../Display";

import mockFetchShow from "./../../api/fetchShow";
jest.mock("./../../api/fetchShow");

const mockShow = {
  name: "flash",
  summary: "fastest guy in the world",
  seasons: [
    { name: "season1", id: 1, episodes: [] },
    { name: "season2", id: 2, episodes: [] },
    { name: "season3", id: 3, episodes: [] },
  ],
};

test("renders without errors with no props", () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  mockFetchShow.mockResolvedValueOnce(mockShow);

  render(<Display />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const showComponent = await screen.findByTestId("show-container");
  //console.log(showComponent);
  //console.log(button);
  expect(showComponent).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(mockShow);

  render(<Display />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const shows = await screen.findAllByTestId("season-option");
  //console.log(shows);

  expect(shows).toHaveLength(3);
});

test("displayfunc is called when the fetch button is pressed", async () => {
  mockFetchShow.mockResolvedValueOnce(mockShow);
  const displayFunc = jest.fn();
  render(<Display displayFunc={displayFunc} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(displayFunc).toBeCalled();
  });
});
