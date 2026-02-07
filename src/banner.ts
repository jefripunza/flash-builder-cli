import fs from "fs";
import path from "path";
import { PWD, FROM_NODE_MODULE } from "./environment";

const packageJsonPath = FROM_NODE_MODULE
  ? path.join(PWD, "package.json")
  : path.join(PWD, "node_modules", "flash-builder", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const packageVersion = packageJson.version;
console.log({
  packageJsonPath,
  packageJson,
  packageVersion,
});

const banner = `
    ________           __       ____        _ __    __         
   / ____/ /___ ______/ /_     / __ )__  __(_) /___/ /__  _____
  / /_  / / __ \`/ ___/ __ \\   / __  / / / / / / __  / _ \\/ ___/
 / __/ / / /_/ (__  ) / / /  / /_/ / /_/ / / / /_/ /  __/ /    
/_/   /_/\\__,_/____/_/ /_/  /_____/\\__,_/_/_/\\__,_/\\___/_/      ${packageVersion}
---------------------------------------------------------------------
`;

export default banner;
