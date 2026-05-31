import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("proof-factory app", () => {
  it("serves the HTML routes", async () => {
    const htmlRoutes = ["/", "/proof-lane", "/evidence-table", "/roi-claims", "/board-snippets", "/verification", "/docs"];

    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    }
  });

  it("serves the JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/proof-lane",
      "/api/evidence-table",
      "/api/roi-claims",
      "/api/board-snippets",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
    }
  });
});
