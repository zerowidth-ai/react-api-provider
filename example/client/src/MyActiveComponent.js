// MyActiveComponent.js
import React, { useEffect } from 'react';
import { useZeroWidthApi } from '@zerowidth/react-api-provider';

function MyActiveComponent() {
  const { data, error, loading, process } = useZeroWidthApi();

  const identifier = 'identifier_01';

  useEffect(() => {
    process({
      intelligenceId: 'your-intel-id', // Replace with actual intelligence ID
      data: { 
        variables: {
          A: 200,
          B: 500
        }
      }, // Replace with actual data
    }, identifier); // Use the relative path to the endpoint
  }, [process]);

  if (loading[identifier]) return <div>Loading...</div>;
  if (error[identifier]) return <div>Error: {error[identifier].message}</div>;

  // Render your component using the data from the API
  return (
    <div>
      ACTIVE<br/>
      {data[identifier] && <pre>{JSON.stringify(data[identifier], null, 2)}</pre>}
      {/* Render other UI elements based on the data */}
    </div>
  );
}

export default MyActiveComponent;
