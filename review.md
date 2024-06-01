# Code review

### Essential

- `Tests`: not all tests are passed, it's essential to make sure before commit that all tests are passed
- Search movies does not work

### Global

- It's better to use `TypeScript` for type safety and avoiding unexpected issues
- `Eslint`: to maintain code quality and best practices
- `Prettier`: for automatic consistent code formatting
- `App structure`: When using React with Redux Toolkit, it's better to maintain a clean and organized structure
- `"@testing-library/jest-dom", "@testing-library/react", "@testing-library/user-event", "node-sass", "react-scripts", "web-vitals"` - these packages needed only during development, so must be placed under `devDependencies`
- It would recommend to use RTK Query or SWR for data fetching + caching

```
src/
├── app/
│   ├── store.js          # Redux store configuration
│   └── rootReducer.js    # Root reducer combining feature reducers
├── assets/
├── components/           # Reusable UI components
│   ├── Component1/
│   │   ├── Component1.jsx
│   │   ├── Component1.css
│   │   └── Component1.test.jsx
├── features/             # Feature-specific code
│   ├── feature1/
│   │   ├── components/   # Components specific to this feature
│   │   ├── feature1Slice.js  # Redux slice for this feature
│   │   ├── Feature1Container.jsx
├── hooks/                # Custom React hooks
├── services/             # API calls and services
├── styles/               # Global styles and theming
├── utils/                # Utility functions
├── App.jsx
├── index.js
└── setupTests.js
```

### Security

- [Index.html:14](public/index.html) - If we care about various attacks we have to use more strict CSP header

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
      style-src 'self' 'unsafe-inline'
      img-src 'self';
      connect-src 'self';
      frame-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
      upgrade-insecure-requests;
      block-all-mixed-content;
      report-uri /csp-violation-report-endpoint;
    "
/>
```

### Constants.js

- [src/constants.js:1](src/constants.js) - insecure data/api keys leaking to the repository. It is better to store API_KEY in a .env file or as an environment variable.
- [constants.js:14](src/constants.js) - `ENDPOINT` can be set in `.env` to reuse it for different APP environments (`DEV`, `PROD`)
- [constants.js:3:4](src/constants.js) - 2 API endpoints are incorrect because of extra `/`
- [constants.js:15](src/constants.js) - preferable using strings interpolation over concatenation

```javascript
export const ENDPOINT_DISCOVER = `${ENDPOINT}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc`;

// instead of
export const ENDPOINT_DISCOVER =
  ENDPOINT + "/discover/movie?api_key=" + API_KEY + "&sort_by=vote_count.desc";
```

### App.js

- [App.js](src/App.js) - is overloaded with logic, some logic can be implemented in moviesSlice, custom hooks
- [App.js:14](src/App.js) - it's better to place selectors func to the featureSlice.js
- [App.js:22](src/App.js) - variables/functions are defined but not used
- [App.js:48](src/App.js) - mixed concatenation + interpolation, preferable using interpolation
- [App.js:81](src/App.js) - `searchParams={searchParams} setSearchParams={setSearchParams}` are passed but not used. If we need to pass `searchQuery` it is better to pass just `searchQuery` and not all `searchParams` class instance- [App.js:89](src/App.js) - `<div style={{ padding: "30px" }}>` as far as we use css files, it is recommended to avoid inline styling
- [App.js:87](src/App.js) - `<h6>no trailer available. Try another movie</h6>` is shown in case video is not selected

### Header.js

- [Header.js:34](src/components/Header.jsx) - `<input` is not prefilled with search param in case page is reloaded. To prefill we have to use `defaultValue={searchQuery}` or using controlled `value` prop
- [Header.js:34](src/components/Header.jsx) - `<input` it is better to use debounce to avoid multiple redundant API search requests
- [Header.js:34](src/components/Header.jsx) - prefer `onChange` over `onKeyUp` because virtual keyboards can use autocomplete and predictive text. These features can modify the input value without directly triggering key events.

### Movie.jsx

- [Movie.jsx:15](src/components/Movie.jsx) - improve the `myClickHandler` function and to use of React's synthetic events properly.
- [Movie.jsx:24](src/components/Movie.jsx) - operate with CSS classes by state and string interpolation `` <div className={`card ${isOpen? : 'opened': ''}`}>...`` because this approach is more declarative and aligns well with React's philosophy

### Starred.jsx

- [Starred.jsx:16](src/components/Starred.jsx) - consider using conditional rendering with ternary operator `{starred.starredMovies.length > 0 ? (<div />) :  (<div />)}` or even early return

### WatchLater.jsx

- [WatchLater.jsx:10](src/components/WatchLater.jsx) - `useSelector((state) => state.watchLater)`
- [WatchLater.jsx:11](src/components/WatchLater.jsx) - typos in the code

### moviesSlice.js

- [moviesSlice.js:10](src/data/moviesSlice.js) - consider defining initial status as `idle`

### movieSlice.test.js

- [movieSlice.test.js](src/test/movieSlice.test.js) - in all tests `initialState` is not used
