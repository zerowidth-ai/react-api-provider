This package is currently in beta.

# @zerowidth/react-api-provider


This package provides a React context and hooks for interacting with the ZeroWidth API. It allows you to easily make API calls to process data through agents on the ZeroWidth Workbench, where users can configure large language models (LLMs) and an ecosystem of technologies to adapt LLMs for specific applications or use cases. It is specifically designed to work hand-in-hand with the @zerowidth/api package, and more specifically with the express-middleware proxy setup on your server, which this package will make calls through 

## Features

- Easy integration with React applications.
- Supports processing data and retrieving history.
- Handles streaming responses using Server-Sent Events (SSEs).

## Installation

Install the package using `npm` or `yarn`:

```bash
npm install @zerowidth/react-api-provider
# or
yarn add @zerowidth/react-api-provider
```

## Usage

### Importing the Library

You can import the library components as follows:

```javascript
import { ZeroWidthApiProvider, useZeroWidthApi } from '@zerowidth/react-api-provider';
```

### Setting up the Provider

Wrap your application with the `ZeroWidthApiProvider` to provide the context to your components.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ZeroWidthApiProvider } from '@zerowidth/react-api-provider';

const App = () => (
  <ZeroWidthApiProvider
    appId="your-app-id" 
    endpointId="your-endpoint-id"
    proxyUrl="/api/0w-proxy"
    debugMode={true}
  >
    <YourComponent />
  </ZeroWidthApiProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

### Using the Hook

Use the `useZeroWidthApi` hook to access the API methods and state.

```javascript
import React, { useEffect } from 'react';
import { useZeroWidthApi } from '@zerowidth/react-api-provider';

const YourComponent = () => {
  const { data, error, loading, stream, process, getHistory } = useZeroWidthApi();

  useEffect(() => {
    const fetchData = async () => {
      await process({
        agentId: 'your-agent-id',
        messages: [
          { role: 'user', content: 'Hello' }
        ]
      });
    };

    fetchData();
  }, [process]);

  if (loading['your-identifier']) return <div>Loading...</div>;
  if (error['your-identifier']) return <div>Error: {error['your-identifier'].message}</div>;

  return (
    <div>
      <pre>{JSON.stringify(data['your-identifier'], null, 2)}</pre>
      <pre>{JSON.stringify(stream['your-identifier'], null, 2)}</pre>
    </div>
  );
};

export default YourComponent;
```

### Handling Streaming Responses with SSEs

The ZeroWidth API supports streaming responses using Server-Sent Events (SSEs). This allows you to receive real-time updates from the API as events occur. To handle streaming responses, enable the `stream` option in the `process` method, and access the stream data from the context.

#### Example with Streaming

```javascript
import React, { useEffect } from 'react';
import { useZeroWidthApi } from '@zerowidth/react-api-provider';

const YourComponent = () => {
  const { stream, process } = useZeroWidthApi();

  useEffect(() => {
    const fetchData = async () => {
      await process({
        agentId: 'your-agent-id',
        messages: [
          { role: 'user', content: 'Hello' }
        ],
        stream: true
      });
    };

    fetchData();
  }, [process]);

  return (
    <div>
      {stream['your-identifier']?.map((event, index) => (
        <div key={index}>
          <strong>{event.eventType}:</strong> {JSON.stringify(event.data, null, 2)}
        </div>
      ))}
    </div>
  );
};

export default YourComponent;
```

In this example, the `stream` option is set to `true`, and the `stream` data from the context is used to display real-time events.

### API Reference

#### `ZeroWidthApiProvider`

The provider component that supplies the ZeroWidth API context to its children.

**Props:**

| Prop         | Type     | Default | Description                                                              |
|--------------|----------|---------|--------------------------------------------------------------------------|
| `appId`      | string   |         | Deprecated. Use `endpointId` instead.                                     |
| `endpointId` | string   |         | The endpoint ID for the API.                                              |
| `proxyUrl`   | string   |         | Where did you mount the @zerowidth/api Express middleware? |
| `debugMode`  | boolean  | `false` | Enables debug mode, which logs additional information to the console.     |

#### `useZeroWidthApi`

A hook to access the ZeroWidth API context.

**Returns:**

| Name      | Type     | Description                                                        |
|-----------|----------|--------------------------------------------------------------------|
| `data`    | object   | An object containing the response data for each request.           |
| `error`   | object   | An object containing any errors that occurred for each request.    |
| `loading` | object   | An object indicating the loading state for each request.           |
| `stream`  | object   | An object containing the streamed events for each request.         |
| `process` | function | A function to make a process request to the API.                   |
| `getHistory` | function | A function to retrieve the history for a specific session.        |

### Contributing

Contributions to the `@zerowidth/react-api-provider` package are welcome. Please follow the steps below to contribute:

1. Fork the repository and create your feature branch: `git checkout -b my-new-feature`.
2. Commit your changes: `git commit -am 'Add some feature'`.
3. Push to the branch: `git push origin my-new-feature`.
4. Submit a pull request.

### Support

If you have any questions or need help integrating the `@zerowidth/react-api-provider` package, please open an issue in the GitHub repository or reach out to us directly via our website: [zerowidth.ai](https://zerowidth.ai)

## License

This project is licensed under the MIT License.