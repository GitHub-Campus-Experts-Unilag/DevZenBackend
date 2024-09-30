// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RestError, createFile, createHttpHeaders, createPipelineRequest, } from "@azure/core-rest-pipeline";
import { getCachedDefaultHttpsClient } from "./clientHelpers.js";
import { isReadableStream } from "./helpers/isReadableStream.js";
/**
 * Helper function to send request used by the client
 * @param method - method to use to send the request
 * @param url - url to send the request to
 * @param pipeline - pipeline with the policies to run when sending the request
 * @param options - request options
 * @param customHttpClient - a custom HttpClient to use when making the request
 * @returns returns and HttpResponse
 */
export async function sendRequest(method, url, pipeline, options = {}, customHttpClient) {
    var _a;
    const httpClient = customHttpClient !== null && customHttpClient !== void 0 ? customHttpClient : getCachedDefaultHttpsClient();
    const request = buildPipelineRequest(method, url, options);
    const response = await pipeline.sendRequest(httpClient, request);
    const headers = response.headers.toJSON();
    const stream = (_a = response.readableStreamBody) !== null && _a !== void 0 ? _a : response.browserStreamBody;
    const parsedBody = options.responseAsStream || stream !== undefined ? undefined : getResponseBody(response);
    const body = stream !== null && stream !== void 0 ? stream : parsedBody;
    if (options === null || options === void 0 ? void 0 : options.onResponse) {
        options.onResponse(Object.assign(Object.assign({}, response), { request, rawHeaders: headers, parsedBody }));
    }
    return {
        request,
        headers,
        status: `${response.status}`,
        body,
    };
}
/**
 * Function to determine the request content type
 * @param options - request options InternalRequestParameters
 * @returns returns the content-type
 */
function getRequestContentType(options = {}) {
    var _a, _b, _c;
    return ((_c = (_a = options.contentType) !== null && _a !== void 0 ? _a : (_b = options.headers) === null || _b === void 0 ? void 0 : _b["content-type"]) !== null && _c !== void 0 ? _c : getContentType(options.body));
}
/**
 * Function to determine the content-type of a body
 * this is used if an explicit content-type is not provided
 * @param body - body in the request
 * @returns returns the content-type
 */
function getContentType(body) {
    if (ArrayBuffer.isView(body)) {
        return "application/octet-stream";
    }
    if (typeof body === "string") {
        try {
            JSON.parse(body);
            return "application/json; charset=UTF-8";
        }
        catch (error) {
            // If we fail to parse the body, it is not json
            return undefined;
        }
    }
    // By default return json
    return "application/json; charset=UTF-8";
}
function buildPipelineRequest(method, url, options = {}) {
    var _a, _b, _c;
    const requestContentType = getRequestContentType(options);
    const { body, formData } = getRequestBody(options.body, requestContentType);
    const hasContent = body !== undefined || formData !== undefined;
    const headers = createHttpHeaders(Object.assign(Object.assign(Object.assign({}, (options.headers ? options.headers : {})), { accept: (_c = (_a = options.accept) !== null && _a !== void 0 ? _a : (_b = options.headers) === null || _b === void 0 ? void 0 : _b.accept) !== null && _c !== void 0 ? _c : "application/json" }), (hasContent &&
        requestContentType && {
        "content-type": requestContentType,
    })));
    return createPipelineRequest({
        url,
        method,
        body,
        formData,
        headers,
        allowInsecureConnection: options.allowInsecureConnection,
        tracingOptions: options.tracingOptions,
        abortSignal: options.abortSignal,
        onUploadProgress: options.onUploadProgress,
        onDownloadProgress: options.onDownloadProgress,
        timeout: options.timeout,
        enableBrowserStreams: true,
        streamResponseStatusCodes: options.responseAsStream
            ? new Set([Number.POSITIVE_INFINITY])
            : undefined,
    });
}
/**
 * Prepares the body before sending the request
 */
function getRequestBody(body, contentType = "") {
    if (body === undefined) {
        return { body: undefined };
    }
    if (isReadableStream(body)) {
        return { body };
    }
    const firstType = contentType.split(";")[0];
    if (firstType === "application/json") {
        return { body: JSON.stringify(body) };
    }
    if (ArrayBuffer.isView(body)) {
        return { body: body instanceof Uint8Array ? body : JSON.stringify(body) };
    }
    switch (firstType) {
        case "multipart/form-data":
            return isRLCFormDataInput(body)
                ? { formData: processFormData(body) }
                : { body: JSON.stringify(body) };
        case "text/plain":
            return { body: String(body) };
        default:
            if (typeof body === "string") {
                return { body };
            }
            return { body: JSON.stringify(body) };
    }
}
function isRLCFormDataValue(value) {
    return (typeof value === "string" ||
        value instanceof Uint8Array ||
        // We don't do `instanceof Blob` since we should also accept polyfills of e.g. File in Node.
        typeof value.stream === "function");
}
function isRLCFormDataInput(body) {
    return (body !== undefined &&
        body instanceof Object &&
        Object.values(body).every((value) => isRLCFormDataValue(value) || (Array.isArray(value) && value.every(isRLCFormDataValue))));
}
function processFormDataValue(value) {
    return value instanceof Uint8Array ? createFile(value, "blob") : value;
}
/**
 * Checks if binary data is in Uint8Array format, if so wrap it in a Blob
 * to send over the wire
 */
function processFormData(formData) {
    const processedFormData = {};
    for (const element in formData) {
        const value = formData[element];
        processedFormData[element] = Array.isArray(value)
            ? value.map(processFormDataValue)
            : processFormDataValue(value);
    }
    return processedFormData;
}
/**
 * Prepares the response body
 */
function getResponseBody(response) {
    var _a, _b;
    // Set the default response type
    const contentType = (_a = response.headers.get("content-type")) !== null && _a !== void 0 ? _a : "";
    const firstType = contentType.split(";")[0];
    const bodyToParse = (_b = response.bodyAsText) !== null && _b !== void 0 ? _b : "";
    if (firstType === "text/plain") {
        return String(bodyToParse);
    }
    // Default to "application/json" and fallback to string;
    try {
        return bodyToParse ? JSON.parse(bodyToParse) : undefined;
    }
    catch (error) {
        // If we were supposed to get a JSON object and failed to
        // parse, throw a parse error
        if (firstType === "application/json") {
            throw createParseError(response, error);
        }
        // We are not sure how to handle the response so we return it as
        // plain text.
        return String(bodyToParse);
    }
}
function createParseError(response, err) {
    var _a;
    const msg = `Error "${err}" occurred while parsing the response body - ${response.bodyAsText}.`;
    const errCode = (_a = err.code) !== null && _a !== void 0 ? _a : RestError.PARSE_ERROR;
    return new RestError(msg, {
        code: errCode,
        statusCode: response.status,
        request: response.request,
        response: response,
    });
}
//# sourceMappingURL=sendRequest.js.map