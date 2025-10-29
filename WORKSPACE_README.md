# Workspace Directory

Personal workspace for database projects and development.

---

## Directory Structure

### 📁 Spectrometer_Issue/
**Database Correction Project - COMPLETED ✓**
- Fixed swapped Mn/Mg/Cr columns in SPECTRO_RESULTS_N1 table
- 6,797 records corrected (2022-2025)
- Contains: Production scripts, final reports, documentation
- See: `Spectrometer_Issue/README.md` for details

### 📁 SSRS/
SQL Server Reporting Services and database work:
- **SQL_Scripts/** - SQL query files and database scripts
  - Cross-midnight logic debugging
  - Item result and consumption queries
  - Verification and testing scripts
- **CSV_Data/** - CSV export files
  - KPEX Item Result and Consumption data
  - Test data exports
- **Test_Files/** - Temporary and test files

### 📁 MCP/
MCP (Model Context Protocol) configuration files

---

## Active Projects

### ✓ Spectrometer Database Correction (COMPLETED)
- **Status:** Production fix applied October 28, 2025
- **Backup:** SPECTRO_RESULTS_N1_BACKUP_20251028
- **Documentation:** Full process documentation in Word and Markdown
- **Reports:** VP presentation ready

---

## Tools

### ORGANIZE_WORKSPACE.ps1
Script to organize workspace files into proper directories

**Usage:**
```powershell
powershell -ExecutionPolicy Bypass -File ORGANIZE_WORKSPACE.ps1
```

---

**Last Updated:** October 28, 2025
