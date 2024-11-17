import {
  DOContext,
  FunctionResponse,
  ParsedWebEvent,
} from "../utils/doHelpers";

export async function main(
  _event: ParsedWebEvent,
  _context: DOContext
): Promise<FunctionResponse> {
  return {
    statusCode: 200,
    body: JSON.stringify({ hello: "world" }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}
