// MyPassiveComponent.js
import React from 'react';
import { useZeroWidthApi } from '@zerowidth/react-api-provider';

function MyPassiveComponent() {
  const { data } = useZeroWidthApi();

  // Access the data using the same indentifier that the active component used
  const componentData = data['identifier_01'];

  // Render something with the data
  return (
    <div>
      PASSIVE:<br/>
      {componentData ? (
        <pre>{JSON.stringify(componentData, null, 2)}</pre>
      ) : (
        <p>No data found for this component.</p>
      )}
    </div>
  );
}

export default MyPassiveComponent;
