import "isomorphic-unfetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IndexPage from "./index";

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (_req, res, ctx) => {
    return res(
      ctx.json({
        weather: [
          {
            description: "Overcast clouds",
          },
        ],
        main: {
          // temp in Kelvin
          temp: 295.372,
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders without search input", async () => {
  render(<IndexPage />);

  expect(screen.getByText("Weather Search:")).toBeTruthy;
  expect(screen.getByRole("textbox")).toBeTruthy;
  expect(screen.getByRole("button")).toBeTruthy;

  expect(screen.queryByText("Temperature:")).toEqual(null);
  expect(screen.queryByText("Descripiton:")).toEqual(null);
});

test("Renders with search input", async () => {
  const user = userEvent.setup();
  render(<IndexPage />);
  const input = screen.getByRole("textbox");
  await user.type(input, "springfield");

  const button = screen.getByRole("button");
  await user.type(button, "{enter}");
  // console.log(button);
  // await user.click(button);

  // expect(screen.getByText("Descripiton: Overcast Clouds")).toBeTruthy;
});
