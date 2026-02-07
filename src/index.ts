#!/usr/bin/env bun

// third party
import meow from "meow";

// banner
import banner from "./banner";

// environment
import "./environment";

// commands
import { beCommand } from "./commands/be/index";
import { mcpCommand } from "./commands/mcp/index";
import { syncCommand } from "./commands/sync/index";

const cli = meow(
  `
${banner}
	Usage
	  $ fbi <command> [options]

	Commands
	  be <project-name>       Initialize a new backend project
	  mcp <project-name>      Initialize a new mcp server project
	  sync                    Sync the current backend interface with the application target

	Options
	  --verbose, -v           Enable verbose logging
	  --help, -h              Show this help message
	  --version               Show version number

	Examples
	  $ fbi be my-app
	  $ fbi mcp my-mcp-server
	  $ fbi sync
`,
  {
    importMeta: import.meta,
    flags: {
      verbose: {
        type: "boolean",
        shortFlag: "v",
        default: false,
      },
    },
  },
);

const [command, ...args] = cli.input;
// console.log({ args });

switch (command) {
  case "be":
    beCommand(args[0] || "", cli.flags.verbose, args[1]);
    break;

  case "mcp":
    mcpCommand(args[0] || "", cli.flags.verbose);
    break;

  case "sync":
    syncCommand(cli.flags.verbose);
    break;

  default:
    if (command) {
      console.error(`❌ Unknown command: ${command}`);
    }
    cli.showHelp();
    process.exit(command ? 1 : 0);
}
