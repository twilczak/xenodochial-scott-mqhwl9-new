import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IndexPage from "./index";

jest.mock("../services/get-weather", () => () => {
    return new Promise((resolve) => {
        resolve({
            weather: [
                {
                    description: "Overcast clouds",
                },
            ],
            main: {
                // temp in Kelvin
                temp: 295.372,
            },
        });
    });
});

test("Renders without search input", async () => {
  render(<IndexPage />);

  expect(screen.getByText("Weather Search:")).toBeTruthy();
  expect(screen.getByRole("textbox")).toBeTruthy();
  expect(screen.getByRole("button")).toBeTruthy();

  expect(screen.queryByText("Temperature:")).toBeNull()
  expect(screen.queryByText("Description:")).toBeNull()
});

test("Renders with search input", async () => {
  const user = userEvent.setup();
  render(<IndexPage />);
  const input = screen.getByRole("textbox");
  await user.type(input, "springfield");

  const button = screen.getByRole("button");
  await user.click(button);

  expect(screen.getByText("Description: Overcast clouds")).toBeTruthy();
  expect(screen.getByText("Temperature: 72 ℉")).toBeTruthy();
});
