import React, { createContext, useState, useContext, useCallback } from 'react';

const ZeroWidthApiContext = createContext();

const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const ZeroWidthApiProvider = ({ children, appId, endpointId, proxyUrl, debugMode }) => {
  if(debugMode) console.log('ZeroWidthApiProvider', { appId, endpointId, proxyUrl, debugMode });

  const effectiveEndpointId = endpointId || appId;
  if (appId) {
    console.warn('Warning: The appId prop is deprecated and will be removed in future versions. Please use endpointId instead.');
  }

  if (!effectiveEndpointId || typeof effectiveEndpointId !== 'string' || typeof proxyUrl !== 'string') {
    throw new Error('endpointId (or appId for backward compatibility) and proxyUrl props must be provided as strings to ZeroWidthApiProvider');
  }

  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState({});

  const process = useCallback(async (options = {}, identifier = generateId()) => {
    setLoading(prev => ({ ...prev, [identifier]: true }));
    setError(prev => ({ ...prev, [identifier]: null }));

    try {
      const url = `${proxyUrl}/process/${effectiveEndpointId}/${options.agentId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      });
      const responseData = await response.json();
      setData(prev => ({ ...prev, [identifier]: responseData }));
    } catch (err) {
      setError(prev => ({ ...prev, [identifier]: err }));
    } finally {
      setLoading(prev => ({ ...prev, [identifier]: false }));
    }
  }, [proxyUrl, effectiveEndpointId]);

  const getHistory = useCallback(async ({ agentId, userId, sessionId, startAfter } = {}, identifier = generateId()) => {
    setLoading(prev => ({ ...prev, [identifier]: true }));
    setError(prev => ({ ...prev, [identifier]: null }));

    try {
      const queryParams = new URLSearchParams(startAfter ? { startAfter } : {});
      const response = await fetch(`${proxyUrl}/history/${effectiveEndpointId}/${agentId}/${userId}/${sessionId}?${queryParams}`);
      const responseData = await response.json();
      setData(prev => ({ ...prev, [identifier]: responseData }));
    } catch (err) {
      setError(prev => ({ ...prev, [identifier]: err }));
    } finally {
      setLoading(prev => ({ ...prev, [identifier]: false }));
    }
  }, [proxyUrl, effectiveEndpointId]);

  return (
    <ZeroWidthApiContext.Provider value={{ data, error, loading, process, getHistory }}>
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
