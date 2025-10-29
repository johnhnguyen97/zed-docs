---
layout: default
title: Home
---

# Zed + Sage MCP Documentation

**Complete guide to setting up and using Zed with Sage MCP auto-activation in a multi-project workspace**

---

## 📚 Documentation

### Quick Start
- [**README**](./README.md) - Overview and setup guide
- [**Quick Index**](./INDEX.md) - Fast navigation and checklists

### Configuration
- [**Configuration Guide**](./CONFIGURATION_GUIDE.md) - Step-by-step setup instructions
- [**zed-settings.json**](./zed-settings.json) - Zed editor configuration
- [**skill-rules.json**](./skill-rules.json) - Auto-activation rules

### Deep Dives
- [**Auto-Activation Implementation**](./AUTO_ACTIVATION_IMPLEMENTATION.md) - How it works
- [**Workflow Guide**](./Work_flow.md) - Real-world usage from 6 months of experience
- [**Hooks Setup**](./ZED_HOOKS_SETUP.md) - Multi-project workspace setup

### Reference
- [**CLAUDE.md**](./CLAUDE.md) - Workspace guide for Claude Code
- [**Workspace Structure**](./WORKSPACE_README.md) - Original workspace layout

---

## 🎯 What is This?

This documentation shows you how to set up **Zed editor** with **Sage MCP** (Model Context Protocol server) that has **automatic tool activation**.

### Key Features

✅ **Auto-Activation** - Tools trigger automatically based on keywords
✅ **Persistent Memory** - Never lose conversation history
✅ **Smart Search** - 60-80% token reduction with semantic search
✅ **Multi-Project** - Works across multiple projects
✅ **Zero Manual Calls** - No more typing "use X tool"

### The 6 Auto-Activated Tools

| Tool | Triggers | What It Does |
|------|----------|--------------|
| **memory** | "remember", "recall" | Searches persistent memory |
| **tasks** | "implement", "fix" | Tracks tasks and progress |
| **codebase** | "where is", "find" | Semantic code search |
| **analyze** | "check", "review" | Analyzes files |
| **debug** | "error", "bug" | Auto-diagnoses errors |
| **knowledge** | "relationship", "architecture" | Queries knowledge graph |

---

## 🚀 Quick Start

1. **Install Sage MCP**
   ```bash
   cd MCP/sage-mcp
   python -m venv .venv
   .venv/Scripts/activate
   pip install -e .
   ```

2. **Configure Zed**
   - Copy [zed-settings.json](./zed-settings.json) to your Zed config
   - Update paths for your system

3. **Enable Auto-Activation**
   - Copy [skill-rules.json](./skill-rules.json) to workspace root
   - Add `SKILL_RULES_PATH` to Zed settings

4. **Restart Zed**
   - Tools will auto-activate based on keywords!

---

## 📖 Documentation Sections

### For First-Time Setup
👉 Start with [README.md](./README.md)

### For Configuration Help
👉 See [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)

### For Understanding How It Works
👉 Read [AUTO_ACTIVATION_IMPLEMENTATION.md](./AUTO_ACTIVATION_IMPLEMENTATION.md)

### For Workflow Tips
👉 Check [Work_flow.md](./Work_flow.md)

### For Quick Reference
👉 Use [INDEX.md](./INDEX.md)

---

## 💡 Example Usage

**You:** "Where is the authentication logic? I need to fix a bug."

**Behind the scenes:**
1. `codebase` tool auto-activates → Searches code
2. `debug` tool auto-activates → Analyzes error
3. `memory` tool auto-activates → Searches past context

**Result:** Claude has full context automatically!

---

## 🔧 Requirements

- Zed editor
- Python 3.9+
- Ollama (or OpenAI/Gemini API key)
- Sage MCP server

---

**Configuration Date:** October 29, 2025  
**Sage MCP Version:** 1.0.0  
**Status:** ✅ Production Ready
