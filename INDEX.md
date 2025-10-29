# Zed Documentation Repository - Quick Index

**Complete reference for Zed + Sage MCP + Auto-Activation setup**

---

## 📚 Documentation Files

### 🚀 Start Here

| File | Purpose | When to Read |
|------|---------|--------------|
| **[README.md](./README.md)** | Overview and quick start | First time setup |
| **[CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)** | Detailed configuration steps | When setting up or troubleshooting |

### 📖 Understanding the System

| File | Purpose | When to Read |
|------|---------|--------------|
| **[AUTO_ACTIVATION_IMPLEMENTATION.md](./AUTO_ACTIVATION_IMPLEMENTATION.md)** | How auto-activation works | To understand the architecture |
| **[Work_flow.md](./Work_flow.md)** | Real-world usage from 6 months of use | For workflow inspiration and tips |
| **[ZED_HOOKS_SETUP.md](./ZED_HOOKS_SETUP.md)** | Multi-project workspace hooks | Setting up hooks across projects |

### ⚙️ Configuration Files

| File | Purpose | Where It Goes |
|------|---------|---------------|
| **[zed-settings.json](./zed-settings.json)** | Zed editor configuration | `%APPDATA%/Zed/settings.json` (Windows) |
| **[skill-rules.json](./skill-rules.json)** | Auto-activation rules | Workspace root directory |
| **[CLAUDE.md](./CLAUDE.md)** | Workspace guide for Claude Code | Workspace root directory |

### 📝 Reference

| File | Purpose |
|------|---------|
| **[WORKSPACE_README.md](./WORKSPACE_README.md)** | Original workspace structure |
| **[INDEX.md](./INDEX.md)** | This file - Quick reference |

---

## 🎯 Quick Navigation

### I want to...

**Set up Zed with Sage MCP for the first time**
1. Read [README.md](./README.md) - Quick Start section
2. Follow [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)
3. Copy [zed-settings.json](./zed-settings.json) to Zed config
4. Copy [skill-rules.json](./skill-rules.json) to workspace root
5. Restart Zed

**Understand how auto-activation works**
1. Read [AUTO_ACTIVATION_IMPLEMENTATION.md](./AUTO_ACTIVATION_IMPLEMENTATION.md)
2. Review [skill-rules.json](./skill-rules.json) with comments
3. Check logs: `MCP/sage-mcp/logs/mcp_server.log`

**Fix auto-activation not working**
1. Check [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md) - Troubleshooting section
2. Verify `SKILL_RULES_PATH` in [zed-settings.json](./zed-settings.json)
3. Check logs for warnings

**Customize auto-activation**
1. Edit [skill-rules.json](./skill-rules.json)
2. Add keywords, change priorities, adjust max activations
3. See [README.md](./README.md) - Customization section

**Learn workflow tips**
1. Read [Work_flow.md](./Work_flow.md) - Real-world experience
2. Check sections on:
   - Dev docs system
   - Planning process
   - Code reviews
   - PM2 setup

**Set up multi-project workspace**
1. Read [ZED_HOOKS_SETUP.md](./ZED_HOOKS_SETUP.md)
2. Configure workspace-level rules in [skill-rules.json](./skill-rules.json)
3. Create per-project CLAUDE.md files

---

## 🔧 Configuration Checklist

### Zed Settings (`%APPDATA%/Zed/settings.json`)

- [ ] `context_servers.sage-mcp` configured
- [ ] `command` points to Python executable
- [ ] `args[0]` points to server.py
- [ ] `PYTHONPATH` set correctly
- [ ] `SKILL_RULES_PATH` set correctly
- [ ] `DEFAULT_MODEL` is explicit (not "auto")
- [ ] AI provider configured (Ollama/OpenAI/etc.)

### Sage MCP Installation

- [ ] Virtual environment created
- [ ] Package installed with `pip install -e .`
- [ ] Can run `python server.py` without errors
- [ ] Logs directory exists: `MCP/sage-mcp/logs/`

### Auto-Activation Setup

- [ ] `skill-rules.json` in workspace root
- [ ] `SKILL_RULES_PATH` in Zed settings matches location
- [ ] JSON is valid (test with `python -m json.tool`)
- [ ] 12 rules configured (memory, tasks, codebase, etc.)
- [ ] Global settings defined (max activations, priority)

### Verification

- [ ] Zed shows green dot in status bar
- [ ] Logs show: "Auto-activation engine initialized with 12 rules"
- [ ] Logs show: "Auto-activation initialized from: [path]"
- [ ] Test prompt triggers auto-activation
- [ ] Memory persists across sessions

---

## 📊 File Statistics

| Category | Count | Total Size |
|----------|-------|------------|
| Documentation | 9 files | ~128 KB |
| Configuration | 3 files | ~21 KB |
| Guides | 4 files | ~72 KB |
| Reference | 2 files | ~9 KB |

---

## 🎓 Learning Path

### Beginner
1. ✅ Quick Start ([README.md](./README.md))
2. ✅ Configuration ([CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md))
3. ✅ Basic usage with auto-activation

### Intermediate
1. ✅ Understand auto-activation ([AUTO_ACTIVATION_IMPLEMENTATION.md](./AUTO_ACTIVATION_IMPLEMENTATION.md))
2. ✅ Customize skill-rules.json
3. ✅ Set up multi-project workspace ([ZED_HOOKS_SETUP.md](./ZED_HOOKS_SETUP.md))

### Advanced
1. ✅ Full workflow integration ([Work_flow.md](./Work_flow.md))
2. ✅ Create custom tools in Sage MCP
3. ✅ Build specialized agents
4. ✅ Implement hooks system

---

## 🆘 Common Issues

| Issue | Solution | Reference |
|-------|----------|-----------|
| Auto-activation not working | Check SKILL_RULES_PATH | [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md#troubleshooting) |
| Sage MCP won't start | Verify paths and `pip install -e .` | [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md#sage-mcp-wont-start) |
| Memory not persisting | Check `~/.nexus/memory/` | [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md#memory-not-persisting) |
| Connection timeout | Set explicit DEFAULT_MODEL | [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md#connection-timeout) |
| Import errors | Run `pip install -e .` in sage-mcp | [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md#import-errors-in-logs) |

---

## 🔗 External Resources

- **Sage MCP:** https://github.com/johnhnguyen97/sage-mcp
- **Zed Editor:** https://zed.dev/
- **Ollama:** https://ollama.com/
- **Model Context Protocol:** https://modelcontextprotocol.io/

---

## 📅 Version Information

- **Documentation Version:** 1.0
- **Last Updated:** October 29, 2025
- **Sage MCP Version:** 1.0.0
- **Tested with:** Zed 0.1.0, Python 3.11
- **Compatible OS:** Windows 10/11, macOS 10.15+, Linux

---

## 🤝 Credits

**Configuration developed from:**
- 6 months of hardcore Claude Code usage
- Multi-project workspace experience
- Reddit community workflows
- Sage MCP development

**Special thanks to:**
- Anthropic for Claude and MCP protocol
- Sage MCP developers
- Zed editor team
- Reddit community for workflow inspiration

---

## 📄 License

Configuration files and documentation: **MIT License**

Feel free to:
- ✅ Use in personal or commercial projects
- ✅ Modify and adapt to your workflow
- ✅ Share with others
- ✅ Create derivative works

---

**Happy Coding! 🚀**

*"Ask not what Claude can do for you, ask what context you can give to Claude"*
