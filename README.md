# MCP Time Server

A TypeScript MCP server for retrieving current UTC time using Streamable HTTP transport.

## Overview

This MCP server provides utilities to retrieve current time information in UTC and specific timezones. It communicates with AI assistants and other MCP clients via HTTP using Streamable HTTP transport, exposing the following capabilities:

- **Tool**: `utc-time` - Retrieves current UTC time in ISO 8601 format
- **Tool**: `timezone-time` - Retrieves current time in any IANA timezone (e.g., Europe/Paris, America/New_York)
- **Prompt**: `time-query-template` - Template for generating time-related queries
- **Resource**: None (this server focuses on real-time data via tools)

**Deployment**: This server is designed to be hosted on [Alpic MCP-Server Cloud Service](https://alpic.ai/)

## Prerequisites

- Node.js 22+ (see `.nvmrc` for exact version)
- pnpm (recommended) or npm

## Installation

1. Navigate to the project directory:

```bash
cd my-mcp-time-server
```

2. Install dependencies:

```bash
pnpm install
```

3. Create environment file (optional):

```bash
cp .env.example .env
```

## Usage

### Development

Start the development server with hot-reload:

```bash
pnpm run dev
```

The server will start on `http://localhost:3000` and automatically restart when you make changes to the source code.

### Production Build

Build the project for production:

```bash
pnpm run build
```

The compiled JavaScript will be output to the `dist/` directory.

### Running the Inspector

Use the MCP inspector tool to test your server:

```bash
pnpm run inspector
```

## API Endpoints

- `POST /mcp` - Main MCP communication endpoint
- `GET /mcp` - Returns "Method not allowed" (405)
- `DELETE /mcp` - Returns "Method not allowed" (405)

## Available Features

### Tools

#### utc-time

Retrieves the current UTC time in ISO 8601 format.

**Parameters:** None

**Example Response:**
```
Current UTC time: 2025-10-03T14:30:45.123Z
```

#### timezone-time

Retrieves the current time in a specific timezone.

**Parameters:**
- `timezone` (required): IANA timezone identifier (e.g., 'Europe/Paris', 'America/New_York', 'Asia/Tokyo')

**Example Response:**
```
Current time in Europe/Paris: 10/03/2025, 16:30:45
```

### Prompts

#### time-query-template

A prompt template for generating time-related queries with optional timezone context.

**Parameters:**
- `timezone` (optional): Timezone to inquire about (e.g., 'Paris', 'UTC', 'New York')

**Example Usage:**
```typescript
// With timezone
{ timezone: "Paris" }
// Generates: "What is the current time in Paris?"

// Without timezone (defaults to UTC)
{}
// Generates: "What is the current time in UTC?"
```

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [Express.js Documentation](https://expressjs.com/)
