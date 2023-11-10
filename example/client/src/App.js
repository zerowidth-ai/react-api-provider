// App.js
import React from 'react';
import { ZeroWidthApiProvider } from '@zerowidth/react-api-provider';
import MyActiveComponent from './MyActiveComponent';
import MyPassiveComponent from './MyPassiveComponent';

function App() {
  const appId = 'your-app-id'; // Replace with actual app ID
  const proxyUrl = '/api/0w-proxy'; // Replace with the actual URL to your proxy endpoint

  return (
    <ZeroWidthApiProvider appId={appId} proxyUrl={proxyUrl}>
      <div className="App">
        <MyActiveComponent />
        <MyPassiveComponent />
      </div>
    </ZeroWidthApiProvider>
  );
}

export default App;
