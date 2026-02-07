import { existsSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

import { log } from "../../utils/logger";
import { PWD, IS_NPMJS } from "../../environment";
import { packageJson, indexTs, gitignore, readme, envFile } from "./files";

export function beCommand(
  projectName: string,
  verbose: boolean,
  targetPath?: string,
) {
  if (!projectName) {
    console.error("❌ Error: Project name is required");
    console.log("Usage: fbi be <project-name>");
    process.exit(1);
  }

  // Handle dot (.) or relative paths starting with ./ in targetPath (args[1])
  let projectPath: string;
  if (targetPath) {
    projectPath = join(PWD, targetPath);
  } else {
    projectPath = join(PWD, projectName);
  }

  if (existsSync(projectPath)) {
    if (IS_NPMJS) {
      console.error(`❌ Error: Directory '${projectName}' already exists`);
      process.exit(1);
    }
  }

  if (!IS_NPMJS) {
    rmSync(PWD, { recursive: true, force: true });
  }

  log(`🚀 Creating new backend project: ${projectName}`, false, verbose);

  // =========================================================================== //

  mkdirSync(projectPath, { recursive: true });
  mkdirSync(join(projectPath, "src"), { recursive: true });
  mkdirSync(join(projectPath, "src", "routes"), { recursive: true });
  mkdirSync(join(projectPath, "src", "controllers"), { recursive: true });
  mkdirSync(join(projectPath, "src", "models"), { recursive: true });
  mkdirSync(join(projectPath, "src", "middlewares"), { recursive: true });

  // --------------------------------------------------------------------------- //

  const packageJsonString = JSON.stringify(packageJson(projectName), null, 2);
  writeFileSync(join(projectPath, "package.json"), packageJsonString);

  // --------------------------------------------------------------------------- //

  writeFileSync(join(projectPath, "src", "index.ts"), indexTs(projectName));
  writeFileSync(join(projectPath, ".env"), envFile);
  writeFileSync(join(projectPath, ".gitignore"), gitignore);
  writeFileSync(join(projectPath, "README.md"), readme(projectName));

  // --------------------------------------------------------------------------- //

  log(
    `✅ Backend project '${projectName}' created successfully!`,
    false,
    verbose,
  );

  log(`\n📦 Installing dependencies...`, false, verbose);
  const installProcess = Bun.spawnSync(["bun", "install"], {
    cwd: projectPath,
    stdout: "inherit",
    stderr: "inherit",
  });

  if (installProcess.exitCode === 0) {
    log(`✅ Dependencies installed successfully!`, false, verbose);
  } else {
    log(`❌ Failed to install dependencies`, false, verbose);
  }

  log(`\nNext steps:`, true, verbose);
  if (!targetPath) {
    log(`  cd ${projectName}`, true, verbose);
  }
  log(`  bun run dev`, true, verbose);
}
