# Zed + Sage MCP Configuration Guide

**Step-by-step guide to configure Zed editor with Sage MCP and auto-activation**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Zed Settings Configuration](#zed-settings-configuration)
3. [Sage MCP Installation](#sage-mcp-installation)
4. [Auto-Activation Setup](#auto-activation-setup)
5. [Verification](#verification)
6. [Configuration Options](#configuration-options)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- ✅ **Zed Editor** - Latest version
- ✅ **Python 3.9+** - With pip and venv
- ✅ **Git** - For cloning repositories
- ✅ **AI Provider** - One of:
  - Ollama (local, free)
  - OpenAI API key
  - Anthropic API key
  - Google Gemini API key

### System Requirements

- **OS:** Windows 10/11, macOS 10.15+, or Linux
- **RAM:** 8GB minimum (16GB recommended for Ollama)
- **Storage:** 5GB for models (if using Ollama)

---

## Zed Settings Configuration

### 1. Locate Zed Settings File

**Windows:**
```
%APPDATA%\Zed\settings.json
C:\Users\[USERNAME]\AppData\Roaming\Zed\settings.json
```

**macOS:**
```
~/.config/zed/settings.json
```

**Linux:**
```
~/.config/zed/settings.json
```

### 2. Open Settings in Zed

Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (macOS)

Or: Menu → Zed → Settings

### 3. Configure Context Server

Add the following to your `settings.json`:

```json
{
  "context_servers": {
    "sage-mcp": {
      "source": "custom",
      "enabled": true,
      "command": "C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp/.venv/Scripts/python.exe",
      "args": [
        "C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp/server.py"
      ],
      "env": {
        "CUSTOM_API_URL": "http://localhost:11434/v1",
        "CUSTOM_API_KEY": "",
        "CUSTOM_MODEL_NAME": "qwen2.5-coder:latest",
        "DEFAULT_MODEL": "qwen2.5-coder:latest",
        "FORCE_DEFAULT_USER_ID": "true",
        "LOG_LEVEL": "INFO",
        "PYTHONPATH": "C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp",
        "SKILL_RULES_PATH": "C:/Users/ee01287/Documents/Workspace/skill-rules.json"
      }
    }
  }
}
```

### 4. Update Paths

**Replace these paths with your actual locations:**

| Setting | Path to Update |
|---------|----------------|
| `command` | Path to Python executable in sage-mcp/.venv |
| `args[0]` | Path to sage-mcp/server.py |
| `PYTHONPATH` | Path to sage-mcp directory |
| `SKILL_RULES_PATH` | Path to workspace skill-rules.json |

**Important for Windows:**
- Use forward slashes: `C:/Users/...` not `C:\Users\...`
- Or escape backslashes: `C:\\Users\\...`

**Example for macOS/Linux:**
```json
{
  "command": "/Users/yourname/Workspace/MCP/sage-mcp/.venv/bin/python",
  "args": [
    "/Users/yourname/Workspace/MCP/sage-mcp/server.py"
  ],
  "env": {
    "PYTHONPATH": "/Users/yourname/Workspace/MCP/sage-mcp",
    "SKILL_RULES_PATH": "/Users/yourname/Workspace/skill-rules.json"
  }
}
```

---

## Sage MCP Installation

### 1. Clone or Locate Sage MCP

```bash
cd C:/Users/ee01287/Documents/Workspace/MCP
# If you don't have it:
git clone https://github.com/johnhnguyen97/sage-mcp.git
cd sage-mcp
```

### 2. Create Virtual Environment

```bash
python -m venv .venv
```

### 3. Activate Virtual Environment

**Windows:**
```bash
.venv\Scripts\activate
```

**macOS/Linux:**
```bash
source .venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -e .
```

This installs Sage MCP in "editable" mode, which is required for the import system.

### 5. Create .env File (Optional)

If you want to use API keys instead of Ollama:

```bash
cd C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp
cp .env.example .env
```

Edit `.env`:
```env
# Choose ONE or more providers
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
ANTHROPIC_API_KEY=...

# Optional: Override default model
DEFAULT_MODEL=gpt-4o
LOG_LEVEL=INFO
```

### 6. Test Sage MCP

```bash
python server.py
```

Expected output:
```
[INFO] Sage MCP Server starting up...
[INFO] Model mode: Fixed model 'qwen2.5-coder:latest'
[INFO] Available tools: ['chat', 'memory', 'tasks', ...]
[INFO] Server ready - waiting for tool requests...
```

Press `Ctrl+C` to stop the test.

---

## Auto-Activation Setup

### 1. Copy skill-rules.json

From this documentation repository:

```bash
cp C:/Users/ee01287/Documents/Workspace/Zed_Documentation/skill-rules.json \
   C:/Users/ee01287/Documents/Workspace/
```

### 2. Understand skill-rules.json Structure

```json
{
  "rules": [
    {
      "tool": "memory",              // Tool name
      "trigger": "auto",             // "auto" | "manual" | "smart"
      "conditions": {
        "keywords": ["remember"],    // Trigger keywords
        "file_patterns": [],         // File path patterns
        "auto_search_on_start": true // Auto-search on startup
      },
      "actions": {                   // What to do when triggered
        "search_memory": {
          "when": "keywords_match",
          "limit": 5
        }
      }
    }
  ],
  "global_settings": {
    "max_auto_activations_per_prompt": 3,
    "priority_order": ["memory", "tasks", "debug"]
  }
}
```

### 3. Verify SKILL_RULES_PATH

Check that Zed settings has the correct path:

```json
{
  "env": {
    "SKILL_RULES_PATH": "C:/Users/ee01287/Documents/Workspace/skill-rules.json"
  }
}
```

### 4. Restart Zed

Close Zed completely and reopen it. The context server will reload with new settings.

---

## Verification

### 1. Check Zed Status Bar

Look for context server indicator in the bottom-right corner of Zed.

**Should show:**
- ✅ Green dot - Sage MCP connected
- ❌ Red dot - Connection failed (see troubleshooting)

### 2. Check Sage MCP Logs

```bash
tail -f C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp/logs/mcp_server.log
```

**Look for these lines:**
```
[INFO] Auto-activation engine initialized with 12 rules
[INFO] Auto-activation initialized from: C:\Users\...\skill-rules.json
[INFO] MCP Client Connected: Claude
```

**If you see this, auto-activation is NOT working:**
```
[WARNING] No skill-rules.json found - auto-activation disabled
```

### 3. Test Auto-Activation

In Zed, with Claude Code:

**Test 1: Memory**
```
Prompt: "What did we discuss earlier about authentication?"
```

Check logs for:
```
[INFO] Auto-activating 1 tools: ['memory']
[INFO] Auto-executing memory tool
```

**Test 2: Codebase**
```
Prompt: "Where is the database connection code?"
```

Check logs for:
```
[INFO] Auto-activating 1 tools: ['codebase']
[INFO] Auto-executing codebase tool
```

**Test 3: Multiple Tools**
```
Prompt: "Find the authentication error in auth.py and explain what's wrong"
```

Check logs for:
```
[INFO] Auto-activating 3 tools: ['codebase', 'debug', 'analyze']
```

---

## Configuration Options

### AI Provider Configuration

#### Option 1: Ollama (Local, Free)

1. Install Ollama: https://ollama.com/
2. Pull a model:
   ```bash
   ollama pull qwen2.5-coder:latest
   ```
3. Configure Zed settings:
   ```json
   {
     "env": {
       "CUSTOM_API_URL": "http://localhost:11434/v1",
       "CUSTOM_MODEL_NAME": "qwen2.5-coder:latest",
       "DEFAULT_MODEL": "qwen2.5-coder:latest"
     }
   }
   ```

**Recommended Models:**
- `qwen2.5-coder:latest` - Best for coding (32B)
- `qwen2.5-coder:7b` - Faster, lower RAM (7B)
- `codellama:latest` - Alternative coding model
- `llama3.1:latest` - General purpose

#### Option 2: OpenAI

1. Get API key: https://platform.openai.com/api-keys
2. Configure Zed settings:
   ```json
   {
     "env": {
       "CUSTOM_API_URL": "https://api.openai.com/v1",
       "CUSTOM_API_KEY": "sk-...",
       "CUSTOM_MODEL_NAME": "gpt-4o",
       "DEFAULT_MODEL": "gpt-4o"
     }
   }
   ```

**Recommended Models:**
- `gpt-4o` - Latest, most capable
- `gpt-4o-mini` - Faster, cheaper
- `o1-mini` - Advanced reasoning

#### Option 3: Google Gemini

1. Get API key: https://aistudio.google.com/app/apikey
2. Configure Zed settings:
   ```json
   {
     "env": {
       "CUSTOM_API_URL": "https://generativelanguage.googleapis.com/v1beta",
       "CUSTOM_API_KEY": "...",
       "CUSTOM_MODEL_NAME": "gemini-2.0-flash-exp",
       "DEFAULT_MODEL": "gemini-2.0-flash-exp"
     }
   }
   ```

**Recommended Models:**
- `gemini-2.0-flash-exp` - Latest experimental
- `gemini-1.5-pro` - Most capable
- `gemini-1.5-flash` - Faster

#### Option 4: Anthropic (via OpenRouter)

1. Get OpenRouter API key: https://openrouter.ai/keys
2. Configure Zed settings:
   ```json
   {
     "env": {
       "CUSTOM_API_URL": "https://openrouter.ai/api/v1",
       "CUSTOM_API_KEY": "sk-or-...",
       "CUSTOM_MODEL_NAME": "anthropic/claude-3.5-sonnet",
       "DEFAULT_MODEL": "anthropic/claude-3.5-sonnet"
     }
   }
   ```

### Auto-Activation Customization

#### Adjust Max Simultaneous Tools

In `skill-rules.json`:
```json
{
  "global_settings": {
    "max_auto_activations_per_prompt": 5  // Default: 3
  }
}
```

Higher = More tools activate (slower, more context)
Lower = Fewer tools activate (faster, less context)

#### Change Priority Order

In `skill-rules.json`:
```json
{
  "global_settings": {
    "priority_order": [
      "debug",      // Check errors first
      "memory",     // Then memory
      "tasks",      // Then tasks
      "analyze",    // Then analyze
      "codebase",   // Then search
      "knowledge"   // Then knowledge graph
    ]
  }
}
```

Tools activate in this order when multiple match.

#### Add Custom Keywords

In `skill-rules.json`:
```json
{
  "tool": "memory",
  "conditions": {
    "keywords": [
      "remember",
      "recall",
      "previous",
      "earlier",
      "YOUR_CUSTOM_KEYWORD"  // Add here
    ]
  }
}
```

#### Disable Auto-Activation for a Tool

In `skill-rules.json`:
```json
{
  "tool": "analyze",
  "trigger": "manual"  // Change from "auto"
}
```

Now "analyze" only runs when explicitly called.

### Logging Configuration

In Zed settings:
```json
{
  "env": {
    "LOG_LEVEL": "DEBUG"  // "DEBUG" | "INFO" | "WARNING" | "ERROR"
  }
}
```

- `DEBUG` - Everything (verbose)
- `INFO` - Normal operation (recommended)
- `WARNING` - Only warnings and errors
- `ERROR` - Only errors

---

## Troubleshooting

### Sage MCP Won't Start

**Symptom:** Red dot in Zed status bar

**Check:**
1. Is Python path correct?
   ```bash
   # Test the path from Zed settings
   C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp/.venv/Scripts/python.exe --version
   ```

2. Is server.py path correct?
   ```bash
   ls C:/Users/ee01287/Documents/Workspace/MCP/sage-mcp/server.py
   ```

3. Is package installed?
   ```bash
   cd MCP/sage-mcp
   .venv/Scripts/activate
   pip list | grep mcp
   ```
   Should show: `sage-mcp` in the list

**Fix:**
```bash
cd MCP/sage-mcp
.venv/Scripts/activate
pip install -e .
```

### Auto-Activation Not Working

**Symptom:** Tools don't auto-activate

**Check logs:**
```bash
tail -n 50 MCP/sage-mcp/logs/mcp_server.log | grep -i "auto"
```

**If you see:**
```
[WARNING] No skill-rules.json found
```

**Fix:** Check SKILL_RULES_PATH in Zed settings

**If you see:**
```
[INFO] Auto-activation engine initialized with 0 rules
```

**Fix:** skill-rules.json is empty or malformed. Validate JSON:
```bash
python -m json.tool skill-rules.json
```

### Memory Not Persisting

**Symptom:** Claude doesn't remember past conversations

**Check database:**
```bash
ls ~/.nexus/memory/nexus_memory.db
```

**If missing:**
```bash
mkdir -p ~/.nexus/memory
```

Then restart Sage MCP.

**Test memory:**
Ask Claude: "Save this to memory: My favorite color is blue"
Then: "What's my favorite color?"

### Connection Timeout

**Symptom:** "Context server request timeout"

**Common causes:**
1. `DEFAULT_MODEL` set to "auto" (Zed requires explicit model)
2. Ollama not running
3. Wrong API endpoint

**Fix #1 - Explicit Model:**
```json
{
  "env": {
    "DEFAULT_MODEL": "qwen2.5-coder:latest"  // Not "auto"
  }
}
```

**Fix #2 - Check Ollama:**
```bash
curl http://localhost:11434/v1/models
```

Should return model list. If error, start Ollama.

**Fix #3 - Test Endpoint:**
```bash
curl -X POST http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen2.5-coder:latest","messages":[{"role":"user","content":"test"}]}'
```

### Import Errors in Logs

**Symptom:**
```
ModuleNotFoundError: No module named 'providers'
```

**Fix:**
```bash
cd MCP/sage-mcp
.venv/Scripts/activate
pip install -e .
```

The package MUST be installed in editable mode (`-e`).

### Slow Performance

**Causes:**
1. Too many tools auto-activating
2. Large codebase searches
3. Model is too large for your hardware

**Fix #1 - Reduce Auto-Activations:**
```json
{
  "global_settings": {
    "max_auto_activations_per_prompt": 2  // From 3
  }
}
```

**Fix #2 - Use Smaller Model:**
```bash
ollama pull qwen2.5-coder:7b
```

Update Zed settings to use `qwen2.5-coder:7b`

**Fix #3 - Disable Heavy Tools:**
```json
{
  "tool": "codebase",
  "trigger": "manual"  // Disable semantic search
}
```

---

## Getting Help

### Check Logs
```bash
# Main log
tail -f MCP/sage-mcp/logs/mcp_server.log

# Activity log
tail -f MCP/sage-mcp/logs/mcp_activity.log
```

### Test Manually
```bash
cd MCP/sage-mcp
.venv/Scripts/activate
python server.py
```

Watch for errors on startup.

### Verify Configuration
```bash
# Check JSON syntax
python -m json.tool skill-rules.json

# Check Zed settings
python -m json.tool "$APPDATA/Zed/settings.json"
```

### Reset Everything
```bash
# Backup current settings
cp "$APPDATA/Zed/settings.json" "$APPDATA/Zed/settings.json.backup"

# Reset Sage MCP
cd MCP/sage-mcp
rm -rf .venv
python -m venv .venv
.venv/Scripts/activate
pip install -e .

# Restart Zed
```

---

## Next Steps

1. ✅ Verify configuration working
2. 📖 Read [Work_flow.md](./Work_flow.md) for usage patterns
3. 🎯 Customize skill-rules.json for your workflow
4. 🧠 Start building persistent memory
5. 🚀 Explore advanced features

---

**Configuration Guide Version:** 1.0
**Last Updated:** October 29, 2025
**Tested with:** Zed 0.1.0, Sage MCP 1.0.0, Python 3.11
