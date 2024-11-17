export interface FunctionResponse {
  statusCode: number; // HTTP status code (e.g., 200, 404)
  body: string | Record<string, any>; // The response body, can be a string or an object
  headers?: Record<string, string>; // Optional response headers
}

export interface HttpEvent {
  http: {
    headers: Record<string, string>; // HTTP headers as key-value pairs
    method: string; // HTTP method (GET, POST, etc.)
    path: string; // The path of the request (e.g., "/my-function")
  };
  [key: string]: any; // Allow additional parsed fields from query/body
}

export interface ParsedWebEvent extends HttpEvent {
  query?: Record<string, string>; // Optional query parameters parsed from the URL
  body?: Record<string, any>; // Optional body parameters, parsed from JSON
}

export interface DOContext {
  activationId: string;
  apiHost: string;
  apiKey: string;
  deadline: number;
  functionName: string;
  functionVersion: string;
  namespace: string;
  requestId: string;
}

export const fauxContext: DOContext = {
  activationId: "activation-id",
  apiHost: `http://localhost:${process.env.PORT ?? 3000}`,
  apiKey: "api-key",
  deadline: Date.now() + 1000,
  functionName: "function-name",
  functionVersion: "function-version",
  namespace: "namespace",
  requestId: "request-id",
};
