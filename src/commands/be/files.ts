export const packageJson = (projectName: string) => ({
  name: projectName,
  version: "1.0.0",
  type: "module",
  scripts: {
    dev: "bun run --watch src/index.ts",
    start: "bun run src/index.ts",
    build: "bun build src/index.ts --outdir ./dist",
  },
  dependencies: {
    express: "^4.18.2",
    dotenv: "^16.3.1",
  },
  devDependencies: {
    "@types/express": "^4.17.21",
    "@types/bun": "latest",
  },
});

export const indexTs = (projectName: string) => `import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from ${projectName}!" });
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;

export const gitignore = `node_modules/
dist/
.env
*.log
bun.lock
bun.lockb
`;

export const readme = (projectName: string) => `# ${projectName}

Backend project created with fbi

## Getting Started

\`\`\`bash
cd ${projectName}
bun install
bun run dev
\`\`\`
`;

export const envFile = `PORT=3000
`;
