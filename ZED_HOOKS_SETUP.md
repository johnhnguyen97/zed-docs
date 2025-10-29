# Zed Hooks Setup for Multi-Project Workspace

## Your Workspace Structure

```
C:\Users\ee01287\Documents\Workspace\
├── MCP/
│   ├── sage-mcp/          # Sage MCP server
│   └── sql-context/       # SQL query generation
├── whodb/                 # WhoDB database tool
├── Spectrometer_Issue/    # Spectrometer project
├── SSRS/                  # SSRS project
└── claude-hooks/          # Hook system (NEW)
```

## ✅ Recommended Setup: Workspace-Level Hooks

**Answer: YES, initialize at the workspace root level!**

### Why Workspace-Level?

1. **Shared skills** - SQL patterns apply across multiple projects
2. **Consistent quality** - Same error checking for all projects  
3. **Single configuration** - One place to manage everything
4. **Cross-project awareness** - Claude knows about all your projects

## 🚀 Setup Steps

### Step 1: Create Root CLAUDE.md

This is your "master" configuration that points to each project:

```bash
cd C:\Users\ee01287\Documents\Workspace
```

Create `CLAUDE.md`:

```markdown
# Workspace Overview

This is a multi-project workspace with several active projects.

## Projects

### MCP Servers
- **sage-mcp**: Advanced MCP server with memory and multi-model support
  - See: [MCP/sage-mcp/CLAUDE.md](./MCP/sage-mcp/CLAUDE.md)
  - Skills: mcp-development, python-development
  
- **sql-context**: SQL query generation with semantic search
  - See: [MCP/sql-context/CLAUDE.md](./MCP/sql-context/CLAUDE.md)
  - Skills: sql-generation-guidelines, typescript-development

### Database Tools
- **whodb**: Database management tool (Go + React)
  - See: [whodb/CLAUDE.md](./whodb/CLAUDE.md)
  - Skills: golang-development, whodb-integration

### Analytics
- **Spectrometer_Issue**: Spectrometer data analysis
  - See: [Spectrometer_Issue/CLAUDE.md](./Spectrometer_Issue/CLAUDE.md)
  - Skills: data-analysis, python-development

- **SSRS**: SQL Server Reporting Services
  - See: [SSRS/CLAUDE.md](./SSRS/CLAUDE.md)
  - Skills: sql-server-development, reporting

## Workspace-Wide Rules

1. **Plan before implementing** - Use planning mode
2. **Skills auto-activate** - Hooks handle this automatically
3. **Zero errors** - Hooks catch all TypeScript/build errors
4. **Document as you go** - Update relevant CLAUDE.md files

## Quick Commands

```bash
# Check which project you're in
pwd

# List all projects
ls -la

# Open project-specific docs
# (Just mention the project name, hooks will find it)
```
```

### Step 2: Create Zed Settings with Hooks

**For Zed, hooks are NOT the same as Claude Desktop!**

Zed doesn't support TypeScript hooks like Claude Desktop. Instead, we'll use:

**Option A: Zed Tasks** (Recommended for your setup)

Create `.zed/tasks.json` in workspace root:

```json
{
  "tasks": [
    {
      "label": "Check Builds",
      "command": "bash",
      "args": ["-c", "cd MCP/sql-context && npm run build && cd ../.. && cd MCP/sage-mcp && pip install -e . --quiet"],
      "runInTerminal": true,
      "group": "build"
    },
    {
      "label": "Format All",
      "command": "bash",
      "args": ["-c", "find . -name '*.ts' -o -name '*.py' | xargs -I {} sh -c 'prettier {} || black {}'"],
      "runInTerminal": true
    }
  ]
}
```

**Option B: MCP Server with Skills** (What you already have!)

Good news: **Sage MCP already has skills support!** 

The hooks-like behavior can be implemented through your Sage MCP server:

1. Sage MCP processes your prompts
2. Sage MCP has context about your workspace
3. Sage MCP can inject skill reminders
4. Sage MCP runs in Zed via context servers

### Step 3: Create Skill Structure

```bash
cd C:\Users\ee01287\Documents\Workspace\claude-hooks
mkdir -p skills config
```

Create `config/skill-rules.json`:

```json
{
  "sql-generation-guidelines": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "high",
    "promptTriggers": {
      "keywords": ["sql", "query", "database", "generation", "mssql", "sqlserver"],
      "intentPatterns": [
        "(create|generate|improve|fix).*?(sql|query)",
        "(how to|best practice).*?(sql|database)",
        "multi.*stage.*workflow"
      ]
    },
    "fileTriggers": {
      "pathPatterns": [
        "MCP/sql-context/**/*.ts",
        "whodb/**/*.go",
        "SSRS/**/*.sql"
      ],
      "contentPatterns": [
        "generateSQL",
        "SQLGenerator",
        "executeSQL"
      ]
    }
  },
  
  "mcp-development": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "high",
    "promptTriggers": {
      "keywords": ["mcp", "tool", "server", "context", "protocol"],
      "intentPatterns": [
        "(create|add|implement).*?(mcp|tool|server)",
        "(how to|pattern).*?mcp"
      ]
    },
    "fileTriggers": {
      "pathPatterns": [
        "MCP/**/*.ts",
        "MCP/**/*.py"
      ],
      "contentPatterns": [
        "@modelcontextprotocol",
        "class.*MCP",
        "def.*mcp"
      ]
    }
  },
  
  "golang-development": {
    "type": "language",
    "enforcement": "suggest",
    "priority": "medium",
    "promptTriggers": {
      "keywords": ["go", "golang", "gorm", "gin"],
      "intentPatterns": [
        "(create|add).*?(plugin|handler|service)",
        "golang.*?(pattern|best practice)"
      ]
    },
    "fileTriggers": {
      "pathPatterns": ["whodb/**/*.go"],
      "contentPatterns": [
        "package main",
        "import.*gorm"
      ]
    }
  },
  
  "typescript-development": {
    "type": "language",
    "enforcement": "suggest",
    "priority": "medium",
    "promptTriggers": {
      "keywords": ["typescript", "react", "node"],
      "intentPatterns": [
        "(typescript|ts).*?(error|type|interface)"
      ]
    },
    "fileTriggers": {
      "pathPatterns": [
        "**/*.ts",
        "**/*.tsx"
      ]
    }
  }
}
```

### Step 4: Create Skills

**SQL Generation Skill:**

```bash
mkdir -p skills/sql-generation-guidelines/resources
```

Create `skills/sql-generation-guidelines/SKILL.md`:

```markdown
# SQL Generation Guidelines

## Overview
Multi-stage SQL generation system with automatic retry, failure learning, and many-shot prompting.

## When to Use
- Generating SQL from natural language
- Working on sql-context or whodb projects
- Implementing chat-to-SQL features
- Fixing SQL generation issues

## Core Principles

### 1. Multi-Stage Workflow
Don't generate SQL in one shot. Use stages:
1. Schema overview (Graphviz)
2. Table selection
3. Detailed schema
4. SQL generation
5. Retry on error (up to 3 times)

[See detailed workflow](./resources/multi-stage-workflow.md)

### 2. Never Trust LLM-Generated SQL
Security MUST be enforced at database level:
- Use read-only accounts
- Validate all SQL
- Block dangerous patterns
- Rate limit queries

[See security patterns](./resources/security-patterns.md)

### 3. Learn from Failures
- Log every failed query
- Manual correction workflow
- Build many-shot prompts
- Continuous improvement

[See failure learning](./resources/failure-learning.md)

## Quick Reference

| Task | Pattern | Example |
|------|---------|---------|
| Generate SQL | Multi-stage | See workflow docs |
| Handle errors | Retry 3x with context | See error handling |
| Log failures | SQLite database | See failure logger |
| Build prompts | Many-shot from failures | See prompt builder |

## Integration Points

### With WhoDB
WhoDB has simple single-stage SQL generation. Enhance it with:
- Multi-stage workflow
- Error retry mechanism
- Failure learning system

### With sql-context MCP
Use the TypeScript implementation as reference for patterns.

## Resources
- [Multi-Stage Workflow](./resources/multi-stage-workflow.md)
- [Security Patterns](./resources/security-patterns.md)
- [Failure Learning](./resources/failure-learning.md)
- [Implementation Examples](./resources/examples.md)
```

### Step 5: Per-Project CLAUDE.md Files

Each project should have its own `CLAUDE.md`:

**MCP/sql-context/CLAUDE.md** (if it doesn't exist):
```markdown
# SQL-Context MCP Server

## Quick Start
```bash
npm run build
npm run test
```

## Architecture
- Multi-stage SQL generation
- Failure logging with SQLite
- Many-shot prompt building
- Schema discovery with Graphviz

## Skills Used
- sql-generation-guidelines (auto-activates)
- typescript-development (auto-activates)

## Current Work
See [dev docs](./dev/active/) for ongoing tasks.
```

**whodb/CLAUDE.md** (create new):
```markdown
# WhoDB - Database Management Tool

## Quick Start
```bash
# Community Edition
cd core && go run .

# With Ollama
docker run -it -p 8080:8080 -e WHODB_OLLAMA_HOST=localhost clidey/whodb
```

## Current Goal
Add SQL Server support + integrate advanced SQL generation system

## Skills Used
- golang-development (auto-activates)
- sql-generation-guidelines (for chat feature)
- whodb-integration (auto-activates)

## Architecture
- Go backend with GORM plugins
- React frontend
- LLM integration (Ollama/ChatGPT/Anthropic)
```

## 🎯 How It Works in Zed

Since Zed doesn't have Claude Desktop's hook system, here's how to get similar behavior:

### Manual Workflow (Current)
1. You ask a question
2. Manually mention: "Use sql-generation-guidelines skill"
3. Claude loads and applies skill

### Semi-Automated (What we can do now)
1. Create a **Zed snippet** that auto-adds skill reminders
2. Use **Sage MCP** to inject context
3. Create **custom slash commands** in Sage MCP

### Future Automation (When Zed adds hooks)
Full auto-activation like Claude Desktop

## 🔧 Immediate Actions

### Option 1: Use Sage MCP for Auto-Activation

Sage MCP can act like hooks! Modify sage-mcp to:

1. Analyze your prompt
2. Check workspace location
3. Inject skill reminders
4. Run quality checks

**This is the BEST option for Zed!**

### Option 2: Manual Skill System

Create quick commands in your shell:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias skill-sql="echo '🎯 Use sql-generation-guidelines skill'"
alias skill-mcp="echo '🎯 Use mcp-development skill'"
alias skill-go="echo '🎯 Use golang-development skill'"
```

Then in Zed terminal:
```bash
skill-sql
# Copy the output and add to your prompt
```

## ✅ Recommendation

**For your multi-project workspace:**

1. ✅ **YES** - Initialize hooks at workspace root (`C:\Users\ee01287\Documents\Workspace\`)
2. ✅ Create root `CLAUDE.md` pointing to each project
3. ✅ Create skills in `claude-hooks/skills/`
4. ✅ Configure `skill-rules.json` with all project paths
5. ✅ **Use Sage MCP** to inject skill context (hook-like behavior)
6. ✅ Create per-project `CLAUDE.md` files

## 🚀 Next Steps

1. Create root CLAUDE.md
2. Set up skill structure
3. Configure skill-rules.json
4. Enhance Sage MCP to inject skills
5. Test with a prompt

Want me to:
- **A)** Create all the files and structure now?
- **B)** Modify Sage MCP to add hook-like skill injection?
- **C)** Both A and B?
