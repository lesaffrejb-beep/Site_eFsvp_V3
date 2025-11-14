# 🛠️ Configuration Files Reference

This document explains all configuration files used in the EfSVP project.

## 📦 Build & Dev Tools

### `vite.config.js`
**Purpose**: Main build tool configuration for Vite 7
**Key settings**:
- Base path: `./` (relative paths for GitHub Pages compatibility)
- Output directory: `dist/`
- Dev server port: `3000`
- Path alias: `@/` maps to `./src/`
- Minification: esbuild (fastest)
- Sourcemaps: disabled in production

**Usage**:
```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🎨 Code Quality & Linting

### `eslint.config.js`
**Purpose**: JavaScript linting with ESLint 9 (flat config)
**Scope**: All files in `src/**/*.js`
**Key rules**:
- ES6+ syntax enforced (`no-var`, `prefer-const`)
- Console statements: warn (except `console.warn` and `console.error`)
- Unused vars: error (except those starting with `_`)
- Browser globals: window, document, fetch, IntersectionObserver, etc.

**Usage**:
```bash
npm run lint          # Check for errors
npm run lint:fix      # Auto-fix issues
```

---

### `.stylelintrc.json`
**Purpose**: CSS linting with Stylelint 16
**Config**: Standard configuration (`stylelint-config-standard`)
**Scope**: All CSS files in `src/**/*.css`

**Usage**:
```bash
npm run lint:css      # Check CSS
npm run lint:css:fix  # Auto-fix CSS issues
```

---

### `.prettierrc`
**Purpose**: Code formatting (JavaScript, CSS, HTML)
**Usage**:
```bash
npm run format        # Format all files
npm run format:check  # Check if files are formatted
```

**Integration**: Works with ESLint and Stylelint (no conflicts)

---

## 🎨 PostCSS

### `postcss.config.js`
**Purpose**: CSS post-processing
**Plugins**:
- **autoprefixer**: Automatically adds vendor prefixes for browser compatibility

**Note**: Runs automatically during Vite build, no manual execution needed.

---

## 📝 Git Ignore

### `.gitignore`
**Purpose**: Excludes files from version control
**Key exclusions**:
- `node_modules/`
- `dist/`
- `.DS_Store`
- Audio files (`*.wav`, `*.mp3`, etc.) - kept locally only

---

## 🧪 Full Audit Script

To run all code quality checks at once:

```bash
npm run audit:code
```

This runs:
1. ESLint (JavaScript)
2. Stylelint (CSS)
3. Prettier check (formatting)

---

## 🔗 Related Documentation

- [README.md](../../README.md) - Main project documentation
- [package.json](../../package.json) - Dependencies and scripts
- [PLAN-REFONTE.md](../PLAN-REFONTE.md) - Design system refactoring plan

---

**Last updated**: 2025-11-07
