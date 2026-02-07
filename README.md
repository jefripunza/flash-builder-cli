# ⚡ Flash Builder

<div align="center">

```
    ________           __       ____        _ __    __         
   / ____/ /___ ______/ /_     / __ )__  __(_) /___/ /__  _____
  / /_  / / __ `/ ___/ __ \   / __  / / / / / / __  / _ \/ ___/
 / __/ / / /_/ (__  ) / / /  / /_/ / /_/ / / / /_/ /  __/ /    
/_/   /_/\__,_/____/_/ /_/  /_____/\__,_/_/_/\__,_/\___/_/     
```

**A blazingly fast CLI tool for scaffolding modern backend projects**

[![npm version](https://img.shields.io/npm/v/flash-builder.svg)](https://www.npmjs.com/package/flash-builder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Installation](#-installation) • [Usage](#-usage) • [Commands](#-commands) • [Examples](#-examples)

</div>

---

## ✨ Features

- 🚀 **Lightning Fast** - Built with Bun for maximum performance
- 📦 **Zero Configuration** - Get started immediately with sensible defaults
- 🎯 **Multiple Templates** - Backend (Express) and MCP Server scaffolding
- 🔄 **Auto Install** - Automatically installs dependencies after project creation
- 🎨 **Modern Stack** - TypeScript, Express, and latest best practices
- 🛠️ **Flexible** - Generate in current directory or create new folders

---

## 📦 Installation

### Global Installation

```bash
bun install -g flash-builder@latest
```

---

## 🚀 Usage

```bash
fbi <command> [options]
```

### Quick Start

```bash
# Create a new backend project
fbi be my-project-name

# Create in a specific subdirectory
fbi be my-project-name ./backend


# Create MCP server project
fbi mcp my-mcp-server


# Sync interface from Flash Builder
fbi sync
```

---

## 📚 Commands

### `be <project-name> [target-path]`

Initialize a new backend project with Express and TypeScript.

**Arguments:**
- `project-name` - Name of your project (used in package.json)
- `target-path` - (Optional) Target directory (`.` for current dir, `./path` for subdirectory)

**Generated Structure:**
```
my-backend/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   └── index.ts
├── .env
├── .gitignore
├── package.json
└── README.md
```

**Includes:**
- Express.js server setup
- TypeScript configuration
- Environment variables support
- Auto-installed dependencies
- Development scripts

---

### `mcp <project-name>`

Initialize a new MCP (Model Context Protocol) server project.

**Arguments:**
- `project-name` - Name of your MCP server project

**Generated Structure:**
```
my-mcp-server/
├── src/
│   ├── tools/
│   ├── resources/
│   └── index.ts
├── .env
├── .gitignore
├── package.json
└── README.md
```

**Includes:**
- MCP SDK setup
- TypeScript configuration
- Tools and resources directories
- Auto-installed dependencies

---

### `sync`

Sync the current backend interface with the application target.

**Usage:**
```bash
fbi sync
```

---

## 🎯 Examples

### Create Backend Project

```bash
# Standard - creates new folder
fbi be my-api

# In current directory
fbi be my-api .

# In subdirectory
fbi be my-api ./backend

# With verbose logging
fbi be my-api --verbose
```

### Create MCP Server

```bash
# Standard MCP server
fbi mcp my-mcp-server

# With verbose logging
fbi mcp my-mcp-server -v
```

### After Project Creation

```bash
cd my-api
bun run dev
```

---

## ⚙️ Options

| Option | Alias | Description |
|--------|-------|-------------|
| `--verbose` | `-v` | Enable verbose logging |
| `--help` | `-h` | Show help message |
| `--version` | | Show version number |

---

## 🔧 Development

### Prerequisites

- [Bun](https://bun.sh) v1.3.6 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/jefripunza/flash-builder-cli.git
cd flash-builder-cli

# Install dependencies
bun install

# Run in development
bun run start

# Build for production
bun run build

# Compile binary
bun run compile
```

---

## 📝 Project Templates

### Backend (Express) Template

- **Framework:** Express.js
- **Language:** TypeScript
- **Runtime:** Bun
- **Features:** 
  - REST API structure
  - Environment variables
  - Hot reload in development
  - Production build script

### MCP Server Template

- **Driver:** [jefriherditriyanto/langchain-mcp-api](https://hub.docker.com/r/jefriherditriyanto/langchain-mcp-api)
- **Runtime:** Docker

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

<a href="https://github.com/jefripunza">
  <img src="https://github.com/jefripunza.png" width="50" height="50" alt="Jefri Herdi Triyanto" style="border-radius: 50%;">
</a>

**Jefri Herdi Triyanto** ([@jefripunza](https://github.com/jefripunza))

---

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh) - A fast all-in-one JavaScript runtime
- Powered by [meow](https://github.com/sindresorhus/meow) - CLI helper
- Inspired by modern development workflows

---

<div align="center">

**⚡ Flash Builder - Build faster, ship sooner**

Made with ❤️ by [Jefri Herdi Triyanto](https://github.com/jefripunza)

</div>
