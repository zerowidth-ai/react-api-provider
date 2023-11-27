import {jsxDEV as $6XpKT$jsxDEV} from "react/jsx-dev-runtime";
import {createContext as $6XpKT$createContext, useState as $6XpKT$useState, useCallback as $6XpKT$useCallback, useContext as $6XpKT$useContext} from "react";
import $6XpKT$axios from "axios";
import {v4 as $6XpKT$v4} from "uuid";
import $6XpKT$proptypes from "prop-types";

// ZeroWidthApiProvider.js





const $cf838c15c8b009ba$var$ZeroWidthApiContext = /*#__PURE__*/ (0, $6XpKT$createContext)();
const $cf838c15c8b009ba$export$37cc2048dc8e0ef4 = ({ children: children, appId: appId, endpointId: endpointId, proxyUrl: proxyUrl })=>{
    // Use endpointId or fallback to appId for backward compatibility
    const effectiveEndpointId = endpointId || appId;
    // Deprecation warning for appId
    if (appId) console.warn("Warning: The appId prop is deprecated and will be removed in future versions. Please use endpointId instead.");
    // Validation for required props
    if (effectiveEndpointId === "" || typeof effectiveEndpointId !== "string" || typeof proxyUrl !== "string") throw new Error("endpointId (or appId for backward compatibility) and proxyUrl props must be provided as strings to ZeroWidthApiProvider");
    const [data, setData] = (0, $6XpKT$useState)({});
    const [error, setError] = (0, $6XpKT$useState)({});
    const [loading, setLoading] = (0, $6XpKT$useState)({});
    // Function to process data through an installed intelligence
    const process = (0, $6XpKT$useCallback)(async (options = {}, identifier = (0, $6XpKT$v4)())=>{
        // Set loading state for this specific identifier
        setLoading((prevLoading)=>({
                ...prevLoading,
                [identifier]: true
            }));
        setError((prevError)=>({
                ...prevError,
                [identifier]: null
            }));
        try {
            // Construct the full URL to the proxy endpoint
            const url = `${proxyUrl}/process/${effectiveEndpointId}/${options.intelligenceId}`;
            // Make the HTTP request using axios
            const response = await (0, $6XpKT$axios)({
                method: "POST",
                url: url,
                data: options
            });
            // Set data for this specific identifier
            setData((prevData)=>({
                    ...prevData,
                    [identifier]: response.data
                }));
        } catch (err) {
            // Set error for this specific identifier
            setError((prevError)=>({
                    ...prevError,
                    [identifier]: err
                }));
        } finally{
            // Set loading state to false for this specific identifier
            setLoading((prevLoading)=>({
                    ...prevLoading,
                    [identifier]: false
                }));
        }
    }, [
        proxyUrl,
        effectiveEndpointId
    ]);
    // Function to get the history of a specific intelligence
    const getHistory = (0, $6XpKT$useCallback)(async ({ intelligenceId: intelligenceId, userId: userId, sessionId: sessionId, startAfter: startAfter } = {}, identifier = (0, $6XpKT$v4)())=>{
        setLoading((prevLoading)=>({
                ...prevLoading,
                [identifier]: true
            }));
        setError((prevError)=>({
                ...prevError,
                [identifier]: null
            }));
        try {
            const url = `${proxyUrl}/history/${effectiveEndpointId}/${intelligenceId}/${userId}/${sessionId}`;
            const params = startAfter ? {
                startAfter: startAfter
            } : {};
            const response = await (0, $6XpKT$axios).get(url, {
                params: params
            });
            setData((prevData)=>({
                    ...prevData,
                    [identifier]: response.data
                }));
        } catch (err) {
            setError((prevError)=>({
                    ...prevError,
                    [identifier]: err
                }));
        } finally{
            setLoading((prevLoading)=>({
                    ...prevLoading,
                    [identifier]: false
                }));
        }
    }, [
        proxyUrl,
        effectiveEndpointId
    ]);
    // Expose the context value
    const contextValue = {
        data: data,
        error: error,
        loading: loading,
        process: process,
        getHistory: getHistory
    };
    return /*#__PURE__*/ (0, $6XpKT$jsxDEV)($cf838c15c8b009ba$var$ZeroWidthApiContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "src/index.js",
        lineNumber: 83,
        columnNumber: 5
    }, undefined);
};
$cf838c15c8b009ba$export$37cc2048dc8e0ef4.propTypes = {
    children: (0, $6XpKT$proptypes).node,
    appId: (0, $6XpKT$proptypes).string,
    endpointId: (0, $6XpKT$proptypes).string,
    proxyUrl: (0, $6XpKT$proptypes).string.isRequired
};
$cf838c15c8b009ba$export$37cc2048dc8e0ef4.defaultProps = {
    appId: "",
    endpointId: ""
};
const $cf838c15c8b009ba$export$bd5c376b411b5524 = ()=>{
    const context = (0, $6XpKT$useContext)($cf838c15c8b009ba$var$ZeroWidthApiContext);
    if (context === undefined) throw new Error("useZeroWidthApi must be used within a ZeroWidthApiProvider");
    return context;
};


export {$cf838c15c8b009ba$export$37cc2048dc8e0ef4 as ZeroWidthApiProvider, $cf838c15c8b009ba$export$bd5c376b411b5524 as useZeroWidthApi};
//# sourceMappingURL=main.js.map
