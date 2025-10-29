# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace Overview

This is a multi-project workspace containing:

- **MCP/sage-mcp** - Intelligent MCP server with persistent memory and auto-activation
- **MCP/sql-context** - Semantic T-SQL analysis and search using hybrid BM25+vector embeddings
- **whodb** - Lightweight database management tool with GraphQL API and AI-powered natural language queries
- **Spectrometer_Issue** - Completed database correction project (6,797 records fixed)
- **SSRS** - SQL Server Reporting Services scripts and CSV data exports

## Sage MCP Auto-Activation

This workspace uses **Sage MCP** with automatic tool activation. Tools trigger automatically based on keywords in your requests:

### Auto-Activated Tools
- **memory** - Auto-searches on "remember", "recall", "what did I say" | Auto-saves after task completion
- **tasks** - Auto-lists on project start | Auto-creates on "implement", "fix", "add feature"
- **codebase** - Auto-searches on "where is", "find", "search for" | 60-80% token reduction
- **analyze** - Auto-analyzes files when referenced with "check", "review", "explain"
- **debug** - Auto-triggers on error patterns ("Error:", "Exception:", "Traceback")
- **knowledge** - Auto-queries knowledge graph for "relationship", "architecture" questions

### Configuration
- **Rules**: `skill-rules.json` (workspace root) - keyword triggers, priority order, max activations
- **Zed Settings**: `%APPDATA%/Zed/settings.json` - Sage MCP as context server with Ollama
- **Logs**: `MCP/sage-mcp/logs/mcp_server.log` and `mcp_activity.log`

Memory persists across sessions at `~/.nexus/memory/nexus_memory.db`.

## MCP/sage-mcp Architecture

### Core Components
```
memory/                  # Nexus persistent memory system
├── nexus_core.py       # libSQL/SQLite storage
├── nexus_embedder.py   # Vector embeddings
├── nexus_manager.py    # Memory manager
└── nexus_knowledge_graph.py

tools/                   # 24 AI-powered tools
├── memory.py           # Memory management
├── tasks.py            # Task tracking
├── codebase.py         # Semantic search
└── ...

utils/
├── context_manager.py  # Auto context reset at 100k-150k tokens
└── doc_manager.py      # Memory-based documentation
```

### Development Commands
```bash
# Install
cd MCP/sage-mcp
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -e .

# Run server
python server.py

# Tests (78+ tests, all passing)
pytest
```

### Configuration
- `.env` file with API keys (OpenAI, Gemini, Anthropic, etc.)
- `DEFAULT_MODEL` can be "auto" or specific model name
- Zed requires explicit model name (not "auto")

## MCP/sql-context Architecture

T-SQL semantic search using hybrid BM25 + vector embeddings for minimal token usage.

### Parser Pipeline
```
SQL File → Parser → Extractors → Structured Data
                     ├─ Procedure header (name, parameters)
                     ├─ Variables (UTC, date/time, dynamic SQL)
                     ├─ Dynamic SQL reconstruction
                     └─ CTE extraction
```

### Development Commands
```bash
cd MCP/sql-context
npm install
npm run build

# Run analysis
node dist/test/analyze-procedure.js
```

### Tech Stack
- TypeScript ES2022 with ES modules (`"type": "module"`)
- SQLite (better-sqlite3) + FTS5 for BM25 search
- @xenova/transformers for embeddings (all-MiniLM-L6-v2, 384 dims)
- Tests against `Stored_Procedure_Test.sql` (914-line real procedure)

## whodb Architecture

Lightweight (<50MB) database management tool with GraphQL-first API and plugin architecture.

### Key Architectural Principles

1. **GraphQL First**: All new API functionality MUST use GraphQL unless explicitly required otherwise (e.g., file downloads)
2. **Plugin Architecture**: Database-specific logic stays in plugins - NEVER use `switch dbType` in shared code
3. **Dual Edition**: CE (core/) and EE (ee/) with separate resolver generation
4. **Security**: ALWAYS use parameterized queries or GORM builder - NEVER `fmt.Sprintf` with user input

### Structure
```
core/                      # Community Edition backend
├── src/
│   ├── main.go           # Entry point
│   ├── plugins/          # Database connectors (Postgres, MySQL, SQLite, MongoDB, Redis, etc.)
│   └── engine/           # Plugin registry
├── graph/
│   ├── schema.graphqls   # GraphQL schema
│   └── *.resolvers.go    # Query/mutation implementations
└── build/                # Embedded React frontend

frontend/                  # React + TypeScript frontend
├── src/
│   ├── store/            # Redux Toolkit state
│   └── mutations/*.graphql  # GraphQL operations
└── package.json

ee/                        # Enterprise Edition extensions
├── core/                 # EE-specific plugins
└── frontend/             # EE-specific components
```

### Development Commands

**Community Edition:**
```bash
# Backend
cd core && go run .

# Frontend (separate terminal)
cd frontend && pnpm start

# GraphQL generation
cd core && go generate ./...                    # Backend
cd frontend && pnpm run generate                # Frontend (backend must be running)

# E2E tests
cd frontend && pnpm run cypress:ce
```

**Enterprise Edition:**
```bash
# Backend (from project root)
GOWORK=$PWD/go.work.ee go run -tags ee ./core

# Frontend
cd frontend && pnpm start:ee

# GraphQL generation
cd ee && GOWORK=$PWD/../go.work.ee go generate .
cd frontend && pnpm run generate:ee
```

### Critical Development Rules

1. **Plugin Methods**: Extend `PluginFunctions` interface for new functionality - implement in each plugin
2. **SQL Security**: Use `db.Raw("SELECT * FROM users WHERE id = ?", userInput)` - NEVER string formatting
3. **GraphQL Operations**: Define in `.graphql` files → run `pnpm run generate` → use generated hooks from `@graphql` alias
4. **CE/EE Separation**: All EE code in `ee/` submodule - NEVER in `core/`
5. **Go Modules**: Use `any` instead of `interface{}` (Go 1.18+ syntax)
6. **Dependency Sync**: Shared dependencies MUST have identical versions in CE and EE `go.mod` files
7. **Package Manager**: Always use PNPM instead of NPM
8. **Cleanup**: Delete binaries after test builds (`go build`)

### Adding New Database Support
1. Create plugin in `core/src/plugins/` implementing `Plugin` interface
2. Register in `core/src/engine/registry.go`
3. For EE: Add to `ee/core/src/`

## Spectrometer_Issue (COMPLETED)

Database correction project that fixed swapped Mn/Mg/Cr columns in SPECTRO_RESULTS_N1 table.

- **Status**: Production fix applied October 28, 2025
- **Records Corrected**: 6,797 (2022-2025)
- **Backup**: SPECTRO_RESULTS_N1_BACKUP_20251028
- **Documentation**: `Spectrometer_Issue/Final_Reports/` and Word docs

## SSRS

SQL Server Reporting Services work:
- **SQL_Scripts/**: Cross-midnight logic debugging, item result queries
- **CSV_Data/**: KPEX data exports
- **Test_Files/**: Temporary test data

## Common Workflows

### Starting Work in a Subproject
```
"I need to work on whodb authentication"
→ tasks: Creates task automatically
→ memory: Searches past authentication work
→ codebase: Finds existing auth code
```

### Debugging Errors
```
"Getting TypeError in sage-mcp server.py:123"
→ debug: Analyzes error automatically
→ analyze: Examines server.py context
→ memory: Checks if error seen before
```

### Adding Features
```
"Add PostgreSQL support to sql-context"
→ codebase: Searches existing database connectors
→ memory: Recalls similar implementations
→ tasks: Tracks implementation steps
```

## File Locations

- **Sage MCP Memory**: `~/.nexus/memory/nexus_memory.db`
- **Sage MCP Logs**: `MCP/sage-mcp/logs/`
- **Zed Settings**: `%APPDATA%/Zed/settings.json` (Windows)
- **Workspace Rules**: `skill-rules.json` (root)
- **Go Workspaces**: `go.work`, `go.work.ee`, `go.work.desktop-ce`, `go.work.desktop-ee`

## Important Notes

- **Windows Paths**: Use forward slashes in JSON: `"C:/Users/name/path"` not `"C:\Users\name\path"`
- **Sage MCP Installation**: Must run `pip install -e .` in sage-mcp directory before use
- **whodb Frontend Build**: Must create `core/build/` folder before first backend run
- **Multi-Model Support**: Sage MCP supports OpenAI, Gemini, Claude (via OpenRouter), xAI Grok, Ollama
- **Context Management**: Sage MCP auto-resets context at 150k tokens with state preservation
