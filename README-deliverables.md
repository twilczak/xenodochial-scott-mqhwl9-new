## Deliverable 1 

1. Fix the bug in [city-weather.tsx](components/city-weather.tsx) file.
    - Treating this like a bug ticket, identify the bug in the application and provide a fix.
2. Talk about your changes
    - Write a short description about what was the underlying cause of the bug and how you fixed it

The bug was caused by two null references in the render() method of the CityWeather component. The initial render, 
called when the component was mounted, but before the component's state was set, resulted in the component failing to
render. The simplest solution was to include guards in the render method to avoid any reference to weatherResult if it 
was null.

I also included an initial unit test as part of this deliverable, though I was not able to get the initial stub test to
pass with the included msw mock. Any time that the msw mock GET call was reached, the test would crash with a 
segmentation fault. I am not sure whether this was part of the challenge or an unfortunate error that came up due to 
some other underlying bug. I attempted to run this code on multiple versions of node, and attempted a few other solutions
without success. Ultimately, I applied a bit of light refactoring and jest manual mocking in order to get this test to 
pass. 

See: `services/get-weather.ts`, `components/city-weather.tsx` and `index.test.tsx` for details.

## Deliverable 2:

1. Create a new <samp>components/city-weather-refactor.tsx</samp> file, in which you refactor the `CityWeather` component to use react hooks rather than `React.Component` class. Incorporate the following:

    - Match the design
        - A designer has provided visuals on how this app should look. See [design.png](design.png) for reference.
        - You may need to use different fields from the openweathermap API to match the design. For example, the weather condition three-digit code can be [mapped to the icons here](https://openweathermap.org/weather-conditions).
        - [Tailwind CSS](https://tailwindcss.com/docs/background-color) is installed and configured for you
    - Improve web accessibility
        - Ensure the click event on the "Weather Search" label focuses on the text input.
        - Make sure a screen reader correctly announces loading states.
    - Improve unit tests
        - The existing unit test didn't catch the bug, update and add tests to reduce regression. To run your tests, use script below:
       ```
       yarn test
       ```

2. Talk about your changes
    - For the refactoring and accompanying tasks, include thoughts, assumptions, or known compromises you took to complete the assessment.
