This package is currently in beta.

# @zerowidth/react-api-provider

This package provides a React context provider and hook that allow for easy interaction with the ZeroWidth API, facilitating the process of making API calls and managing state within your React application.

It is specifically designed to work hand-in-hand with the @zerowidth/api package, and more specifically with the ZeroWidthApi

## Features

- Isolated state management for API calls with unique identifiers.
- Simple integration for making API calls to the ZeroWidth API.
- Built-in loading and error handling.
- Supports both `process` and `getHistory` API calls with optional pagination.

## Installation

Install the package using npm or yarn:

```bash
npm install @zerowidth/react-api-provider
# or
yarn add @zerowidth/react-api-provider
```

## Usage

Wrap your application's root component with `ZeroWidthApiProvider` to make the context available throughout your component tree:

```jsx
import { ZeroWidthApiProvider } from '@zerowidth/react-api-provider';

const App = ({ children }) => (
  <ZeroWidthApiProvider endpointId="your-endpoint-collection-id" proxyUrl="your-set-proxy-url">
    {children}
  </ZeroWidthApiProvider>
);

export default App;
```

Use the `useZeroWidthApi` hook in your components to access API functionality:

```jsx
import React, { useEffect } from 'react';
import { useZeroWidthApi } from '@zerowidth/react-api-provider';

const MyComponent = () => {
  const { data, error, loading, process, getHistory } = useZeroWidthApi();
  const identifier = "unique-component-id"; // Replace with a unique ID for your component

  useEffect(() => {
    process({
      intelligenceId: 'your-intelligence-id',
      data: { /* your data here */ },
    }, identifier);
  }, [process, identifier]);

  // ... your component logic
};

export default MyComponent;
```

## API

### `ZeroWidthApiProvider`

A context provider component that accepts `endpointId` and `proxyUrl` as props and wraps the application.

### `useZeroWidthApi`

A hook that provides access to the following:

- `data`: An object containing the response data keyed by identifiers.
- `error`: An object containing any API errors keyed by identifiers.
- `loading`: An object indicating the loading state keyed by identifiers.
- `process(options, identifier)`: A function to make API calls. Accepts an options object and an optional identifier.
- `getHistory(options, identifier)`: A function to retrieve history data. Accepts an options object for history parameters and an optional identifier.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your proposed changes or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Support

For support, please open an issue in the GitHub repository or contact us through via our website: [zerowidth.ai](https://zerowidth.ai).