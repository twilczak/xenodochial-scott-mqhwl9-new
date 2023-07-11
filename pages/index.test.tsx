import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IndexPage from "./index";

let mockGetWeather = () => {};

jest.mock("../services/get-weather", () => () => {
    return mockGetWeather();
});

describe("Weather search index", () => {

    it("Renders without search input", async () => {
        render(<IndexPage />);

        expect(screen.getByText("Weather Search:")).toBeTruthy();
        expect(screen.getByRole("textbox")).toBeTruthy();
        expect(screen.getByRole("button")).toBeTruthy();

        expect(screen.queryByText("Temperature:")).toBeNull()
        expect(screen.queryByText("Description:")).toBeNull()
    });

    it("Renders a loading indicator", async () => {
        const user = userEvent.setup();

        mockGetWeather = () => new Promise(() => {});

        render(<IndexPage />);
        const input = screen.getByRole("textbox");
        await user.type(input, "springfield");

        const button = screen.getByRole("button");
        await user.click(button);

        expect(screen.getByTestId("loading-indicator-component")).toBeTruthy();
        expect(screen.getByText("Loading weather for springfield...")).toBeTruthy();
    });

    it("Renders weather results", async () => {
        const user = userEvent.setup();

        mockGetWeather = () => Promise.resolve({
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

        render(<IndexPage />);
        const input = screen.getByRole("textbox");
        await user.type(input, "springfield");

        const button = screen.getByRole("button");
        await user.click(button);

        expect(screen.getByText("Overcast clouds")).toBeTruthy();
        expect(screen.getByText("Temperature:")).toBeTruthy();
        expect(screen.getByText("72℉")).toBeTruthy();
        expect(screen.queryByTestId("loading-indicator-component")).toBeNull();
    });

    it("Renders an error message", async () => {
        const user = userEvent.setup();
        mockGetWeather = () => Promise.reject(
            Error("Mock Error", {cause: {message: "City Not Found"}})
        );

        render(<IndexPage />);
        const input = screen.getByRole("textbox");
        await user.type(input, "sprungfeld");

        const button = screen.getByRole("button");
        await user.click(button);

        expect(screen.getByText("Error:")).toBeTruthy();
        expect(screen.getByText("Cannot load weather for \"sprungfeld\" - City Not Found")).toBeTruthy();
    });
});
