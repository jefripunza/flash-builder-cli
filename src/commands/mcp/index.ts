import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { log } from "../../utils/logger";

export function mcpCommand(projectName: string, verbose: boolean) {
  if (!projectName) {
    console.error("❌ Error: Project name is required");
    console.log("Usage: fbi mcp <project-name>");
    process.exit(1);
  }

  const projectPath = join(process.cwd(), projectName);

  if (existsSync(projectPath)) {
    console.error(`❌ Error: Directory '${projectName}' already exists`);
    process.exit(1);
  }

  log(`🚀 Creating new MCP server project: ${projectName}`, false, verbose);

  mkdirSync(projectPath, { recursive: true });
  mkdirSync(join(projectPath, "src"), { recursive: true });
  mkdirSync(join(projectPath, "src", "tools"), { recursive: true });
  mkdirSync(join(projectPath, "src", "resources"), { recursive: true });

  const packageJson = {
    name: projectName,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "bun run --watch src/index.ts",
      start: "bun run src/index.ts",
      build: "bun build src/index.ts --outdir ./dist",
    },
    dependencies: {
      "@modelcontextprotocol/sdk": "^0.5.0",
      dotenv: "^16.3.1",
    },
    devDependencies: {
      "@types/bun": "latest",
    },
  };

  writeFileSync(
    join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2),
  );

  writeFileSync(
    join(projectPath, "src", "index.ts"),
    `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";

dotenv.config();

const server = new Server(
  {
    name: "${projectName}",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Add your tools and resources here

const transport = new StdioServerTransport();
await server.connect(transport);

console.log("🚀 MCP Server started");
`,
  );

  writeFileSync(join(projectPath, ".env"), ``);

  writeFileSync(
    join(projectPath, ".gitignore"),
    `node_modules/
dist/
.env
*.log
`,
  );

  writeFileSync(
    join(projectPath, "README.md"),
    `# ${projectName}

MCP Server project created with fbi

## Getting Started

\`\`\`bash
cd ${projectName}
bun install
bun run dev
\`\`\`
`,
  );

  log(`✅ MCP server project '${projectName}' created successfully!`, false, verbose);
  log(`\nNext steps:`, true, verbose);
  log(`  cd ${projectName}`, true, verbose);
  log(`  bun install`, true, verbose);
  log(`  bun run dev`, true, verbose);
}
