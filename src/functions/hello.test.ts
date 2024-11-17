import { fauxContext, HttpEvent } from "../utils/doHelpers.js";
import { describe, expect, it } from "vitest";
import { main } from "./hello.js";

const standardPayload: HttpEvent = {
  http: {
    path: "/",
    headers: {},
    method: "POST",
  },
  headers: {
    "Content-Type": "application/json",
  },
};

describe("Hello World", () => {
  it("should return body", async () => {
    await main(
      {
        ...standardPayload,
      },
      fauxContext
    );
  });
});
