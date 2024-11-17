import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { main as helloMain } from "./functions/hello";
import {
  DOContext,
  fauxContext,
  FunctionResponse,
  ParsedWebEvent,
} from "./utils/doHelpers";

dotenv.config();

const routes: Record<
  string,
  (event: ParsedWebEvent, context: DOContext) => Promise<FunctionResponse>
> = {
  "/example/hello": helloMain,
};

// Converts Express request to DigitalOcean event structure
export function convertToDOEvent(req: Request): ParsedWebEvent {
  return {
    http: {
      headers: req.headers, // Map headers from Express to DigitalOcean event
      method: req.method, // HTTP method
      path: req.path, // Request path
    },
    ...req.query, // Merge query params at top-level
    ...req.body, // Merge body params at top-level
  };
}

export function convertToExpressResponse(
  res: Response,
  doResponse: Record<string, any>
) {
  const { statusCode = 200, body = "{}", headers = {} } = doResponse;

  // Set headers if provided
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, String(value));
  });

  // Send response with statusCode and body
  res.status(statusCode).send(body);
}

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Dynamically create routes based on the routes object
Object.entries(routes).forEach(([path, handler]) => {
  app.all(path, async (req: Request, res: Response) => {
    try {
      // Convert Express request to DigitalOcean event format
      const event = convertToDOEvent(req);

      // Call the appropriate handler for the route
      const doResponse = await handler(event, fauxContext);

      // Convert the DigitalOcean function's response to Express response
      convertToExpressResponse(res, doResponse);
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

app.listen(port, () => {
  console.log(`Local server listening at http://localhost:${port}`);
});
