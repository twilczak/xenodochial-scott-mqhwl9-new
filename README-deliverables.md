## Deliverable 1 

1. Fix the bug in [city-weather.tsx](components/city-weather.tsx) file.
    - Treating this like a bug ticket, identify the bug in the application and provide a fix.
2. Talk about your changes
    - Write a short description about what was the underlying cause of the bug and how you fixed it

- The bug was caused by two null references in the render() method of the CityWeather component. The initial render, called when the component was mounted, but before the component's state was set, resulted in the component failing to render. The simplest solution was to include a guard in the render method to avoid any reference to weatherResult if it was null.


- I also included an initial unit test as part of this deliverable, though I was not able to get the initial stub test to pass with the included msw mock. Any time that the msw mock GET call was reached, the test would crash with a segmentation fault. I am not sure whether this was part of the challenge or an unfortunate error that came up due to some other underlying bug. I attempted to run this code locally on multiple versions of node, and attempted a few other solutions without success. Ultimately, I applied a bit of light refactoring and jest manual mocking in order to get this test to pass. I would've preferred to solve this using MSW, but felt I had already lost a good amount of time searching for a solution to this issue without success. 


- I would be inclined to delete this component and rename city-weather-refactor to use city-weather component's name, but stopped short of that in order to include this solution in the assessment. 

See: `services/get-weather.ts`, `components/city-weather.tsx` and `index.test.tsx` for details.

## Deliverable 2:

1. Create a new <samp>components/city-weather-refactor.tsx</samp> file, in which you refactor the `CityWeather` component to use React hooks rather than `React.Component` class. Incorporate the following:

    - Match the design
        - A designer has provided visuals on how this app should look. See [design.png](design.png) for reference.
        - You may need to use different fields from the openWeatherMap API to match the design. For example, the weather condition three-digit code can be [mapped to the icons here](https://openweathermap.org/weather-conditions).
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

- Styling: 
I tried to get the resulting components as close to the design as possible. I think that it is _close_ but likely not_perfect_. For colors, I used close approximations from Tailwind's color palettes and OSX's color meter utility. Overall I tried to stay within those predefined colors rather than creating new colors everywhere - my motivation here is to remain as consistent with what the rest of the team might use rather than introducing new values all over the place that have to be revisited. I did use a custom color for the search button that matched the design as I was unable to find a tailwind color that was close enough. Similarly, I tried to get all the spacing values as close as I could, but I am not 100% certain they are _perfect_. I didn't implement hover or focus states, and left the default focus ring alone as the design didn't include these. These are all things I would review with designers and/or other devs prior to submitting a pull request.


- Refactoring: 
I decided to split the rendering and data loading logic into multiple pieces. Some teams prefer more self-contained logic. By default, I tend to prefer smaller components that are easier to reason about, and keep loading functionality separate from purely display logic. In my experience it is easier to reuse smaller pieces through composition this way. However, I would also discuss this approach with the team to balance my preferences with existing team practices.


- Testing:
As mentioned in the deliverables for part one, I wasn't able to get MSW working correctly and opted to go with manual jest mocks in order to get adequate coverage. I am coming around to the idea that smaller integration style tests strike a good balance between coverage and functionality. However, it can be harder to quickly know which component in the hierarchy failed with a large number of very broad tests.


- Additional Notes:
Due to the previously mentioned segmentation fault in testing, I connected this codesandbox to a gitHub repository in order to work with the code locally. This repo is public as I was unable to get this working with a private repo. As I am unsure how to disconnect the repo from gitHub without destroying the sandbox, I will keep this repo on gitHub for the remainder of interview process. I intend to remove it once the process is resolved. If you prefer that I remove this sooner, please let me know. I am certain the team would not want solved repositories available for future candidates to reference. 
