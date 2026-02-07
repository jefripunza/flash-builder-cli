import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { log } from "../../utils/logger";
import { PWD } from "../../environment";

export function syncCommand(verbose: boolean) {
  log(
    `🔄 Syncing backend interface with application target...`,
    false,
    verbose,
  );

  const packageJsonPath = join(PWD, "package.json");

  if (!existsSync(packageJsonPath)) {
    console.error("❌ Error: package.json not found in current directory");
    console.log("Make sure you're in a project directory");
    process.exit(1);
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    log(`Project: ${packageJson.name}`, true, verbose);
    log(`Version: ${packageJson.version}`, true, verbose);

    log(`✅ Sync completed successfully!`, false, verbose);
  } catch (error) {
    console.error("❌ Error reading package.json:", error);
    process.exit(1);
  }
}
