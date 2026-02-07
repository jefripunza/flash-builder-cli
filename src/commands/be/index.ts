import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { log } from "../../utils/logger";

export function beCommand(projectName: string, verbose: boolean) {
  if (!projectName) {
    console.error("❌ Error: Project name is required");
    console.log("Usage: fbi be <project-name>");
    process.exit(1);
  }

  const projectPath = join(process.cwd(), projectName);

  if (existsSync(projectPath)) {
    console.error(`❌ Error: Directory '${projectName}' already exists`);
    process.exit(1);
  }

  log(`🚀 Creating new backend project: ${projectName}`, false, verbose);

  mkdirSync(projectPath, { recursive: true });
  mkdirSync(join(projectPath, "src"), { recursive: true });
  mkdirSync(join(projectPath, "src", "routes"), { recursive: true });
  mkdirSync(join(projectPath, "src", "controllers"), { recursive: true });
  mkdirSync(join(projectPath, "src", "models"), { recursive: true });
  mkdirSync(join(projectPath, "src", "middlewares"), { recursive: true });

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
      express: "^4.18.2",
      dotenv: "^16.3.1",
    },
    devDependencies: {
      "@types/express": "^4.17.21",
      "@types/bun": "latest",
    },
  };

  writeFileSync(
    join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2),
  );

  writeFileSync(
    join(projectPath, "src", "index.ts"),
    `import express from "express";
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
`,
  );

  writeFileSync(join(projectPath, ".env"), `PORT=3000\n`);

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

Backend project created with fbi

## Getting Started

\`\`\`bash
cd ${projectName}
bun install
bun run dev
\`\`\`
`,
  );

  log(`✅ Backend project '${projectName}' created successfully!`, false, verbose);
  log(`\nNext steps:`, true, verbose);
  log(`  cd ${projectName}`, true, verbose);
  log(`  bun install`, true, verbose);
  log(`  bun run dev`, true, verbose);
}
