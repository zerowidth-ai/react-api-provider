// ZeroWidthApiProvider.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ZeroWidthApiContext = createContext();

export const ZeroWidthApiProvider = ({ children, appId, proxyUrl }) => {
  
  if (typeof appId !== 'string' || typeof proxyUrl !== 'string') {
    throw new Error('appId and proxyUrl props must be provided as strings to ZeroWidthApiProvider');
  }

  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState({});

  // Function to process data through an installed intelligence
  const process = useCallback(async (options = {} , identifier = uuidv4()) => {
    // Set loading state for this specific identifier
    setLoading((prevLoading) => ({ ...prevLoading, [identifier]: true }));
    setError((prevError) => ({ ...prevError, [identifier]: null }));

    try {
      // Construct the full URL to the proxy endpoint
      const url = `${proxyUrl}/process/${appId}/${options.intelligenceId}`;
      // Make the HTTP request using axios
      const response = await axios({
        method: 'POST',
        url: url,
        params: { appId, ...options.params }, 
        data: options, 
      });
      // Set data for this specific identifier
      setData((prevData) => ({ ...prevData, [identifier]: response.data }));
    } catch (err) {
      // Set error for this specific identifier
      setError((prevError) => ({ ...prevError, [identifier]: err }));
    } finally {
      // Set loading state to false for this specific identifier
      setLoading((prevLoading) => ({ ...prevLoading, [identifier]: false }));
    }
  }, [proxyUrl, appId]);


  // Function to get the history of a specific intelligence
  const getHistory = useCallback(async ({ intelligenceId, userId, sessionId, startAfter } = {}, identifier = uuidv4()) => {
    setLoading((prevLoading) => ({ ...prevLoading, [identifier]: true }));
    setError((prevError) => ({ ...prevError, [identifier]: null }));

    try {
      const url = `${proxyUrl}/history/${appId}/${intelligenceId}/${userId}/${sessionId}`;
      const params = startAfter ? { startAfter } : {};
      const response = await axios.get(url, { params });
      setData((prevData) => ({ ...prevData, [identifier]: response.data }));
    } catch (err) {
      setError((prevError) => ({ ...prevError, [identifier]: err }));
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [identifier]: false }));
    }
  }, [proxyUrl, appId]);

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

export const useZeroWidthApi = () => {
  const context = useContext(ZeroWidthApiContext);
  if (context === undefined) {
    throw new Error('useZeroWidthApi must be used within a ZeroWidthApiProvider');
  }
  return context;
};
