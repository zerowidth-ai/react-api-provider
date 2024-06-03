import React, { createContext, useState, useContext, useCallback } from 'react';

const ZeroWidthApiContext = createContext();

const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const ZeroWidthApiProvider = ({ children, appId, endpointId, proxyUrl, debugMode }) => {
  if (debugMode) console.log('ZeroWidthApiProvider', { appId, endpointId, proxyUrl, debugMode });

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
  const [stream, setStream] = useState({});

  const process = useCallback(async (options = {}, identifier = generateId()) => {
    setLoading(prev => ({ ...prev, [identifier]: true }));
    setError(prev => ({ ...prev, [identifier]: null }));
    setStream(prev => ({ ...prev, [identifier]: [] }));
    setData(prev => ({ ...prev, [identifier]: null }));

    try {
      const url = `${proxyUrl}/process/${effectiveEndpointId}/${options.agentId}`;
      const headers = { 'Content-Type': 'application/json' };

      if (options.stream) {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(options),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';
        let eventType = '';

        const readStream = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            let lines = buffer.split('\n');

            for (let i = 0; i < lines.length - 1; i++) {
              const line = lines[i].trim();
              if (line.startsWith('event: ')) {
                eventType = line.slice(7).trim();
              } else if (line.startsWith('data: ')) {
                const eventData = JSON.parse(line.slice(6));
                setStream(prev => ({
                  ...prev,
                  [identifier]: [...(prev[identifier] || []), { eventType, data: eventData }]
                }));
              }
            }

            buffer = lines[lines.length - 1];
          }
        };

        readStream().catch(err => {
          setError(prev => ({ ...prev, [identifier]: err }));
        });

      } else {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(options)
        });
        const responseData = await response.json();
        setData(prev => ({ ...prev, [identifier]: responseData }));
        return responseData;
      }
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
    <ZeroWidthApiContext.Provider value={{ data, error, loading, stream, process, getHistory }}>
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
