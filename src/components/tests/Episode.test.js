import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Episode from "./../Episode";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

//import { fetchShow } from "./../../api/fetchShow";
//jest.mock("./../../api/fetchShow");

const fakeEpisode = {
  id: 1,
  image:
    "https://static.tvmaze.com/uploads/images/medium_landscape/342/855788.jpg",
  name: "name",
  season: 3,
  number: 3,
  summary: "runaway",
  runtime: 30,
};

const fakeEpisode2 = {
  id: 1,
  image: null,
  name: "name",
  season: 3,
  number: 3,
  summary: "runaway",
  runtime: 30,
};

test("renders without error", () => {
  render(<Episode episode={fakeEpisode} />);
});

test("renders the summary test passed as prop", () => {
  render(<Episode episode={fakeEpisode} />);
  //arrange: render

  //act: find our summary
  const summary = screen.queryByText(/runaway/i);
  //console.log(summary);

  //assert: confirm that it exists
  expect(summary).toBeDefined();
  expect(summary).toBeInTheDocument();
  expect(summary).toBeTruthy();
});

test("renders default image when image is not defined", () => {
  render(<Episode episode={fakeEpisode2} />);

  const imageUrl = screen.getByAltText("./stranger_things.png");
  //console.log(imageUrl);

  expect(imageUrl).toBeInTheDocument();
});
