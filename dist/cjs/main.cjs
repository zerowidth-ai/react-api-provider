var $a9A1a$reactjsxdevruntime = require("react/jsx-dev-runtime");
var $a9A1a$react = require("react");
var $a9A1a$axios = require("axios");
var $a9A1a$uuid = require("uuid");
var $a9A1a$proptypes = require("prop-types");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "ZeroWidthApiProvider", () => $4fa36e821943b400$export$37cc2048dc8e0ef4);
$parcel$export(module.exports, "useZeroWidthApi", () => $4fa36e821943b400$export$bd5c376b411b5524);
// ZeroWidthApiProvider.js





const $4fa36e821943b400$var$ZeroWidthApiContext = /*#__PURE__*/ (0, $a9A1a$react.createContext)();
const $4fa36e821943b400$export$37cc2048dc8e0ef4 = ({ children: children, appId: appId, endpointId: endpointId, proxyUrl: proxyUrl })=>{
    // Use endpointId or fallback to appId for backward compatibility
    const effectiveEndpointId = endpointId || appId;
    // Deprecation warning for appId
    if (appId) console.warn("Warning: The appId prop is deprecated and will be removed in future versions. Please use endpointId instead.");
    // Validation for required props
    if (effectiveEndpointId === "" || typeof effectiveEndpointId !== "string" || typeof proxyUrl !== "string") throw new Error("endpointId (or appId for backward compatibility) and proxyUrl props must be provided as strings to ZeroWidthApiProvider");
    const [data, setData] = (0, $a9A1a$react.useState)({});
    const [error, setError] = (0, $a9A1a$react.useState)({});
    const [loading, setLoading] = (0, $a9A1a$react.useState)({});
    // Function to process data through an installed intelligence
    const process = (0, $a9A1a$react.useCallback)(async (options = {}, identifier = (0, $a9A1a$uuid.v4)())=>{
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
            const response = await (0, ($parcel$interopDefault($a9A1a$axios)))({
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
    const getHistory = (0, $a9A1a$react.useCallback)(async ({ intelligenceId: intelligenceId, userId: userId, sessionId: sessionId, startAfter: startAfter } = {}, identifier = (0, $a9A1a$uuid.v4)())=>{
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
            const response = await (0, ($parcel$interopDefault($a9A1a$axios))).get(url, {
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
    return /*#__PURE__*/ (0, $a9A1a$reactjsxdevruntime.jsxDEV)($4fa36e821943b400$var$ZeroWidthApiContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "src/index.js",
        lineNumber: 83,
        columnNumber: 5
    }, undefined);
};
$4fa36e821943b400$export$37cc2048dc8e0ef4.propTypes = {
    children: (0, ($parcel$interopDefault($a9A1a$proptypes))).node,
    appId: (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
    endpointId: (0, ($parcel$interopDefault($a9A1a$proptypes))).string,
    proxyUrl: (0, ($parcel$interopDefault($a9A1a$proptypes))).string.isRequired
};
$4fa36e821943b400$export$37cc2048dc8e0ef4.defaultProps = {
    appId: "",
    endpointId: ""
};
const $4fa36e821943b400$export$bd5c376b411b5524 = ()=>{
    const context = (0, $a9A1a$react.useContext)($4fa36e821943b400$var$ZeroWidthApiContext);
    if (context === undefined) throw new Error("useZeroWidthApi must be used within a ZeroWidthApiProvider");
    return context;
};


//# sourceMappingURL=main.cjs.map
