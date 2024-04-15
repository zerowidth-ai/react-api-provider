// ZeroWidthApiProvider.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ZeroWidthApiContext = createContext();

export const ZeroWidthApiProvider = ({ children, appId, endpointId, proxyUrl, debugMode }) => {
  if(debugMode) console.log('ZeroWidthApiProvider', { appId, endpointId, proxyUrl, debugMode });
    
  // Use endpointId or fallback to appId for backward compatibility
  const effectiveEndpointId = endpointId || appId;

  // Deprecation warning for appId
  if (appId) {
    console.warn('Warning: The appId prop is deprecated and will be removed in future versions. Please use endpointId instead.');
  }

  // Validation for required props
  if (effectiveEndpointId === '' || typeof effectiveEndpointId !== 'string' || typeof proxyUrl !== 'string') {
    throw new Error('endpointId (or appId for backward compatibility) and proxyUrl props must be provided as strings to ZeroWidthApiProvider');
  }

  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState({});

  // Function to process data through an installed agent
  const process = useCallback(async (options = {} , identifier = uuidv4()) => {
    if(debugMode) console.log('process', { options, identifier });

    // Set loading state for this specific identifier
    setLoading((prevLoading) => ({ ...prevLoading, [identifier]: true }));
    setError((prevError) => ({ ...prevError, [identifier]: null }));

    try {
      // Construct the full URL to the proxy endpoint
      const url = `${proxyUrl}/process/${effectiveEndpointId}/${options.agentId}`;

      if(debugMode) console.log('process', { url });
      // Make the HTTP request using axios
      const response = await axios({
        method: 'POST',
        url: url,
        data: options, 
      });
      // Set data for this specific identifier
      if(debugMode) console.log('response', { response });
      setData((prevData) => ({ ...prevData, [identifier]: response.data }));
    } catch (err) {
      // Set error for this specific identifier
      if(debugMode) console.log('error', { err });
      setError((prevError) => ({ ...prevError, [identifier]: err }));
    } finally {
      // Set loading state to false for this specific identifier
      if(debugMode) console.log('loading', { identifier });
      setLoading((prevLoading) => ({ ...prevLoading, [identifier]: false }));
    }
  }, [proxyUrl, effectiveEndpointId]);


  // Function to get the history of a specific agent
  const getHistory = useCallback(async ({ agentId, userId, sessionId, startAfter } = {}, identifier = uuidv4()) => {
    setLoading((prevLoading) => ({ ...prevLoading, [identifier]: true }));
    setError((prevError) => ({ ...prevError, [identifier]: null }));

    try {
      const url = `${proxyUrl}/history/${effectiveEndpointId}/${agentId}/${userId}/${sessionId}`;
      const params = startAfter ? { startAfter } : {};
      const response = await axios.get(url, { params });
      setData((prevData) => ({ ...prevData, [identifier]: response.data }));
    } catch (err) {
      setError((prevError) => ({ ...prevError, [identifier]: err }));
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [identifier]: false }));
    }
  }, [proxyUrl, effectiveEndpointId]);

  // Expose the context value
  const contextValue = {
    data,
    error,
    loading,
    process,
    getHistory
  };

  return (
    <ZeroWidthApiContext.Provider value={contextValue}>
      {children}
    </ZeroWidthApiContext.Provider>
  );
};


ZeroWidthApiProvider.propTypes = {
  children: PropTypes.node,
  appId: PropTypes.string, // This should be marked as deprecated
  endpointId: PropTypes.string,
  proxyUrl: PropTypes.string.isRequired,
};

ZeroWidthApiProvider.defaultProps = {
  appId: '',
  endpointId: '',
};

export const useZeroWidthApi = () => {
  const context = useContext(ZeroWidthApiContext);
  if (context === undefined) {
    throw new Error('useZeroWidthApi must be used within a ZeroWidthApiProvider');
  }
  return context;
};
