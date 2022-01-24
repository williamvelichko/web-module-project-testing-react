import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Episode from "./../Episode";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

//import { fetchShow } from "./../../api/fetchShow";
//jest.mock("./../../api/fetchShow");

const fakeEpisode = [
  {
    id: 1,
    image:
      "https://static.tvmaze.com/uploads/images/medium_landscape/342/855788.jpg",
    name: "name",
    season: 3,
    number: 3,
    summary: "runaway",
    runtime: 30,
  },
];

test("renders without error", () => {
  render(<Episode episode={fakeEpisode} />);
});

test("renders the summary test passed as prop", () => {
  render(<Episode episode={fakeEpisode} />);
});

test("renders default image when image is not defined", () => {});
