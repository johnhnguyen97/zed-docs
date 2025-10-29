# Zed Editor + Sage MCP Configuration Documentation

**Complete guide to setting up and using Zed with Sage MCP auto-activation in a multi-project workspace**

---

## 📁 What's in This Repository

This documentation repository contains everything you need to understand and replicate the Zed + Sage MCP + Auto-Activation setup:

| File | Description |
|------|-------------|
| **README.md** | This file - Overview and quick start |
| **zed-settings.json** | Complete Zed editor configuration with Sage MCP context server |
| **skill-rules.json** | Auto-activation rules for 12 Sage MCP tools |
| **CLAUDE.md** | Workspace-level guide for Claude Code instances |
| **AUTO_ACTIVATION_IMPLEMENTATION.md** | Complete implementation details and how it works |
| **Work_flow.md** | Reddit post - Real-world workflow from 6 months of hardcore use |
| **ZED_HOOKS_SETUP.md** | Guide for setting up hooks in multi-project workspace |
| **WORKSPACE_README.md** | Original workspace directory structure |

---

## 🎯 Quick Start

### Prerequisites
- Zed editor installed
- Python 3.9+ with virtual environment
- Ollama running locally (or other AI provider configured)
- Sage MCP installed at `C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp`

### 1. Configure Zed Settings

Copy `zed-settings.json` to your Zed settings location:

**Windows:**
```bash
cp zed-settings.json "$APPDATA/Zed/settings.json"
```

**macOS/Linux:**
```bash
cp zed-settings.json ~/.config/zed/settings.json
```

### 2. Set Up Sage MCP

```bash
cd C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp
python -m venv .venv
.venv/Scripts/activate  # Windows
source .venv/bin/activate  # macOS/Linux
pip install -e .
```

### 3. Configure Auto-Activation

Copy `skill-rules.json` to workspace root:

```bash
cp skill-rules.json C:/Users/ee01287/Documents/Workspace/
```

### 4. Restart Zed

Close and reopen Zed editor. The Sage MCP context server will start automatically.

### 5. Verify Setup

Check the logs:

```bash
tail -f C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp/logs/mcp_server.log
```

Look for:
- `Auto-activation engine initialized with 12 rules`
- `Auto-activation initialized from: C:\Users\ee01287\Documents\Workspace\skill-rules.json`

---

## 🧠 What is Auto-Activation?

Auto-activation makes Sage MCP tools trigger automatically based on keywords in your prompts, without explicit calls.

### The 6 Auto-Activated Tools

| Tool | Triggers | What It Does |
|------|----------|--------------|
| **memory** | "remember", "recall", "what did I say" | Searches persistent memory, auto-saves context |
| **tasks** | "implement", "fix", "add feature", "what's next" | Lists/creates tasks, tracks progress |
| **codebase** | "where is", "find", "search for", "locate" | Semantic code search (60-80% token reduction) |
| **analyze** | "check", "review", "examine", "explain" | Analyzes files and code |
| **debug** | "error", "bug", "broken", "exception" | Auto-diagnoses errors |
| **knowledge** | "relationship", "architecture", "how does X connect" | Queries knowledge graph |

### Example Workflow

**You:** "Where is the authentication logic? I need to fix a bug where users are getting logged out."

**Behind the scenes:**
1. **codebase** tool auto-activates (keyword: "where is") → Searches codebase
2. **debug** tool auto-activates (keyword: "bug", "fix") → Analyzes error patterns
3. **memory** tool auto-activates (keyword: "logged out") → Searches past context

**Claude responds with:** Full context from all three tools, ready to help fix the issue.

---

## ⚙️ Configuration Files Explained

### zed-settings.json

```json
{
  "context_servers": {
    "sage-mcp": {
      "command": "C:/Users/.../python.exe",
      "args": ["C:/Users/.../server.py"],
      "env": {
        "CUSTOM_API_URL": "http://localhost:11434/v1",  // Ollama endpoint
        "CUSTOM_MODEL_NAME": "qwen2.5-coder:latest",     // Model to use
        "DEFAULT_MODEL": "qwen2.5-coder:latest",
        "PYTHONPATH": "C:/Users/.../sage-mcp",
        "SKILL_RULES_PATH": "C:/Users/.../skill-rules.json"  // NEW: Auto-activation config
      }
    }
  }
}
```

**Key Configuration:**
- `SKILL_RULES_PATH` - Points to workspace skill-rules.json
- `CUSTOM_API_URL` - Use Ollama, OpenAI, or custom endpoint
- `DEFAULT_MODEL` - Must be explicit (not "auto") for Zed

### skill-rules.json

Defines auto-activation rules for each tool:

```json
{
  "tool": "memory",
  "trigger": "auto",  // "auto" | "manual" | "smart"
  "conditions": {
    "keywords": ["remember", "recall", "what did"],
    "file_patterns": [],
    "auto_search_on_start": true
  },
  "actions": {
    "search_memory": {
      "when": "keywords_match",
      "limit": 5
    }
  }
}
```

**Global Settings:**
```json
{
  "global_settings": {
    "max_auto_activations_per_prompt": 3,
    "priority_order": ["memory", "tasks", "debug", "analyze", "codebase"]
  }
}
```

---

## 🏗️ Architecture Overview

### How Auto-Activation Works

```
User Prompt → Zed → Sage MCP Server
                         ↓
              Auto-Activation Engine
                         ↓
            Analyzes prompt for triggers
                         ↓
         Matches keywords/patterns/files
                         ↓
        Selects up to 3 tools (by priority)
                         ↓
              Executes auto-activated tools
                         ↓
          Stores results in _auto_activation_results
                         ↓
        Main tool executes with all context
                         ↓
              Response sent to Claude → Zed
```

### Sage MCP Components

```
sage-mcp/
├── memory/                  # Nexus persistent memory
│   ├── nexus_core.py       # SQLite storage
│   ├── nexus_embedder.py   # Vector embeddings
│   └── nexus_manager.py
├── tools/                   # 24 AI-powered tools
│   ├── memory.py
│   ├── tasks.py
│   ├── codebase.py
│   └── ...
├── utils/
│   ├── auto_activation.py  # Auto-activation engine
│   └── context_manager.py  # Auto context reset
└── server.py               # MCP server entry point
```

---

## 📖 Documentation Guide

### For Quick Reference
- **README.md** (this file) - Overview and setup
- **zed-settings.json** - Copy this to Zed config
- **skill-rules.json** - Copy this to workspace root

### For Understanding the System
- **AUTO_ACTIVATION_IMPLEMENTATION.md** - Deep dive into how auto-activation works
- **Work_flow.md** - Real-world usage patterns and tips from 6 months of use
- **ZED_HOOKS_SETUP.md** - How to set up hooks in multi-project workspace

### For Daily Use
- **CLAUDE.md** - Given to Claude Code instances for workspace context

---

## 🎛️ Customization

### Add Keywords to Existing Tools

Edit `skill-rules.json`:

```json
{
  "tool": "memory",
  "conditions": {
    "keywords": [
      "remember", 
      "recall",
      "YOUR_CUSTOM_KEYWORD"  // Add here
    ]
  }
}
```

### Change Priority Order

```json
{
  "global_settings": {
    "priority_order": [
      "debug",      // Check for errors first
      "memory",     // Then search memory
      "codebase"    // Then search code
    ]
  }
}
```

### Disable Auto-Activation for a Tool

```json
{
  "tool": "analyze",
  "trigger": "manual"  // Change from "auto" to "manual"
}
```

### Adjust Max Simultaneous Activations

```json
{
  "global_settings": {
    "max_auto_activations_per_prompt": 5  // Default: 3
  }
}
```

---

## 🐛 Troubleshooting

### Auto-Activation Not Working

**Check logs:**
```bash
tail -f MCP/sage-mcp/logs/mcp_server.log
```

**Look for:**
- ❌ `No skill-rules.json found - auto-activation disabled`
- ✅ `Auto-activation engine initialized with 12 rules`

**Solution:** Ensure `SKILL_RULES_PATH` is set in Zed settings

### Sage MCP Not Starting

**Check:**
1. Python virtual environment activated
2. Package installed: `pip install -e .` in sage-mcp directory
3. Correct paths in zed-settings.json (use forward slashes)
4. Ollama is running (if using Ollama)

**Test manually:**
```bash
cd MCP/sage-mcp
.venv/Scripts/activate
python server.py
```

### Memory Not Finding Past Context

**Location:** `~/.nexus/memory/nexus_memory.db`

**Check stats:**
```bash
# Use Sage MCP memory tool
# action="stats"
```

**Troubleshoot:**
- Verify database exists
- Check if memories are being saved
- Try explicit search in prompt

### Too Many Tools Activating

**Symptoms:**
- Slow responses
- Irrelevant tools triggering

**Solutions:**
1. Reduce max activations in skill-rules.json
2. Make keywords more specific
3. Change some tools to "manual" trigger

---

## 🚀 Advanced Usage

### Multi-Project Workspace

This setup supports multiple projects sharing memory and knowledge:

```
Workspace/
├── skill-rules.json        # Shared rules
├── MCP/sage-mcp/
├── MCP/sql-context/
├── whodb/
├── Spectrometer_Issue/
└── SSRS/
```

Each project has independent context, but memory is shared.

### Custom Models

Change model in zed-settings.json:

```json
{
  "env": {
    "CUSTOM_API_URL": "https://api.openai.com/v1",
    "CUSTOM_API_KEY": "sk-...",
    "CUSTOM_MODEL_NAME": "gpt-4",
    "DEFAULT_MODEL": "gpt-4"
  }
}
```

**Supported providers:**
- Ollama (local)
- OpenAI
- Anthropic (via OpenRouter)
- Google Gemini
- xAI Grok
- Custom endpoints

### Context Management

Sage MCP automatically:
- Monitors token count (150k limit)
- Auto-saves state at 100k tokens
- Resets context at 150k
- Restores active tasks

No manual intervention needed!

---

## 📊 Statistics

### Implementation Metrics
- **Total Tools:** 24 (6 auto-activated, 18 manual)
- **Auto-Activation Rules:** 12 configured
- **Keywords Tracked:** 80+
- **File Patterns:** 20+
- **Max Activations per Prompt:** 3 (configurable)

### Performance
- **Token Reduction:** 60-80% (codebase semantic search)
- **Memory Speed:** <100ms vector search
- **Context Efficiency:** Auto-reset maintains productivity
- **Storage:** ~10MB for typical project (1000s of memories)

---

## 🎉 What You Get

With this setup:

✅ **Automatic Context** - Tools activate based on keywords
✅ **Persistent Memory** - Never lose conversation history
✅ **Zero Manual Calls** - No more "use X tool" in every prompt
✅ **Smart Search** - 60-80% token reduction with semantic search
✅ **Multi-Project** - Works across all workspace projects
✅ **Self-Healing** - Auto context reset at token limits
✅ **Quality Checks** - Built-in error detection and analysis

---

## 📝 Credits

**System built from:**
- [Sage MCP](https://github.com/johnhnguyen97/sage-mcp) - Intelligent MCP server
- [Work_flow.md](./Work_flow.md) - 6 months of real-world workflow refinement
- [AUTO_ACTIVATION_IMPLEMENTATION.md](./AUTO_ACTIVATION_IMPLEMENTATION.md) - Implementation guide

**Configuration date:** October 29, 2025
**Sage MCP Version:** 1.0.0
**Auto-Activation Status:** ✅ Enabled

---

## 🤝 Contributing

This is a personal configuration, but feel free to:
- Fork and adapt for your workflow
- Share improvements
- Report issues
- Suggest enhancements

---

## 📄 License

Configuration files and documentation: MIT License
Sage MCP: See [sage-mcp repository](https://github.com/johnhnguyen97/sage-mcp)

---

**Built with 🧠 by exploring the limits of AI-assisted development**

*"Ask not what Claude can do for you, ask what context you can give to Claude" ~ Wise Dude*
