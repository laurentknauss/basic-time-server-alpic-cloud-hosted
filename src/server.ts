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

  server.tool(
    "timezone-time",
    "Retrieves the current time in a specific timezone",
    {
      timezone: z.string().describe("IANA timezone identifier (e.g., 'Europe/Paris', 'America/New_York', 'Asia/Tokyo')"),
    },
    async ({ timezone }): Promise<CallToolResult> => {
      const currentTime = new Date();

      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });

        const timeString = formatter.format(currentTime);

        return {
          content: [
            {
              type: "text",
              text: `Current time in ${timezone}: ${timeString}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: Invalid timezone "${timezone}". Please use IANA timezone identifiers like 'Europe/Paris', 'America/New_York', etc.`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  return server;
};
