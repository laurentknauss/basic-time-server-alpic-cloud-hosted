import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { type CallToolResult, type GetPromptResult, type ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

export const getServer = (): McpServer => {
  const server = new McpServer(
    {
      name: "my-mcp-time-server",
      version: "0.0.1",
    },
    { capabilities: {} },
  );

  server.prompt(
    "time-query-template",
    "A prompt template for asking about current time",
    {
      timezone: z.string().optional().describe("Timezone to inquire about (e.g., 'Paris', 'UTC', 'New York')"),
    },
    async ({ timezone }): Promise<GetPromptResult> => {
      const location = timezone || "UTC";
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `What is the current time in ${location}?`,
            },
          },
        ],
      };
    },
  );

  server.tool(
    "utc-time",
    "Retrieves the current UTC time",
    {},
    async (): Promise<CallToolResult> => {
      const currentTime = new Date();
      const utcString = currentTime.toISOString();

      return {
        content: [
          {
            type: "text",
            text: `Current UTC time: ${utcString}`,
          },
        ],
      };
    },
  );

  return server;
};
