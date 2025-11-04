<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# AGENTS.md

This is the canonical entrypoint for AI coding agents (e.g., Amp, Cursor, Codex, Droid, etc...) working in this repository. It provides a concise project overview and points to the nearest per-folder AGENTS.md files that contain the actionable, context-specific rules.

## Project Snapshot

**Repository Type**: Simple single project (not a monorepo)  
**Primary Tech Stack**: React 19, React Router v7 Framework Mode, Material-UI v7, TypeScript (strict), Vite  
**Status**: Boilerplate starter-kit with React Router v7, MUI v7, TanStack Query v5 (planned), Context API  
**Testing**: Not yet configured (planned for future integration)

For detailed patterns and conventions, see [app/AGENTS.md](app/AGENTS.md)

## Root Setup Commands

```bash
# Install dependencies
npm install

# Development server (with HMR)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Start CSR preview (client-side only)
npm run start:csr

# Type checking (generates route types + TypeScript check)
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run prettier
npm run prettier:fix
```

## Universal Conventions

### Code Style

- **TypeScript**: Strict mode enabled (`strict: true` in `tsconfig.json`)
- **Linting**: ESLint with TypeScript ESLint, React Hooks, and React Refresh plugins
- **Formatting**: Prettier (check before committing)
- **Imports**: **MUST** use absolute `@/` alias for all app code (no relative imports)
- **File Naming**: Components and pages use kebab-case (e.g., `nav-item.tsx`, `dashboard-layout.tsx`)

### UI Library

- **Material-UI v7 ONLY** - No other UI libraries allowed
- Tree-shake imports: `import Button from '@mui/material/Button'`
- Icons from `@mui/icons-material` only
- Use `sx` prop for component styling; `styled` only for global reusable components
- Dark mode via CSS variables (never check `theme.palette.mode`)

### React Router v7 Framework Mode

- File-based routing in `app/routes/`
- Route config in `app/routes.ts`
- Always verify API against latest docs via Context7 MCP or web research

### Commit & PR Guidelines

- Follow conventional commit format when possible
- Run `npm run typecheck && npm run lint && npm run prettier` before PR
- Ensure all imports use `@/` alias
- Verify MUI v7 patterns (no deprecated APIs)

## Security & Secrets

- **Never commit** `.env` files (already in `.gitignore`)
- Store environment variables in `.env` (not version controlled)
- No PII or sensitive tokens in code
- Build outputs (`build/`, `.react-router/`) are gitignored

## JIT Index (what to open, not what to paste)

### Directory Structure

- **Application Code**: `app/` → [see app/AGENTS.md](app/AGENTS.md) for detailed patterns
  - Components: `app/components/**` - Reusable UI components
  - Routes: `app/routes/**` - React Router route files
  - Layouts: `app/layouts/**` - Layout wrappers for routes
  - Providers: `app/providers/**` - React Context providers
  - Constants: `app/constants/**` - Constants and mock data
  - Types: `app/types/**` - TypeScript type definitions
  - Assets: `app/assets/**` - Static assets (images, fonts)
  - Styles: `app/styles/**` - Global CSS styles
  - Hooks: `app/hooks/**` - Custom React hooks (planned)
  - Utils: `app/utils/**` - Utility functions (planned)
  - Lib: `app/lib/**` - External library wrappers (planned)
  - Queries: `app/queries/**` - TanStack Query hooks (planned)
  - Tests: `app/tests/**` - Test files (planned)
  - Theme: `app/theme.ts` - MUI theme configuration
  - Root: `app/root.tsx` - Root component entry point
  - Routes Config: `app/routes.ts` - Route configuration

### Quick Find Commands

```bash
# Find a React component
rg -n "export (default )?function .*" app/components

# Find a route file
rg -n "export default function" app/routes

# Find MUI component usage
rg -n "from '@mui/material/" app

# Find icon imports
rg -n "from '@mui/icons-material/" app

# Find theme.palette.mode usage (anti-pattern)
rg -n "theme\.palette\.mode" app

# Find relative imports (anti-pattern)
rg -n "from '\\.\\.?/" app

# Find custom hooks (when hooks/ directory is populated)
rg -n "export (const|function) use" app/hooks

# Find utility functions (when utils/ directory is populated)
rg -n "export (function|const)" app/utils

# Find test files (when tests/ directory is populated)
find app/tests -name "*.test.ts*" -o -name "*.spec.ts*"

# List all directories in app/
ls -d app/*/
```

### Key Configuration Files

- Route config: `react-router.config.ts`
- Vite config: `vite.config.ts`
- TypeScript config: `tsconfig.json`
- ESLint config: `eslint.config.js`
- MUI theme: `app/theme.ts`
- Root component: `app/root.tsx`

## Definition of Done

Before creating a PR, ensure:

- [ ] `npm run typecheck` passes (no TypeScript errors)
- [ ] `npm run lint` passes (no ESLint errors)
- [ ] `npm run prettier` passes (code is formatted)
- [ ] `npm run build` succeeds (production build works)
- [ ] All imports use `@/` alias (no relative imports)
- [ ] File names follow kebab-case convention
- [ ] MUI v7 patterns are followed (no deprecated APIs, tree-shaking imports)
- [ ] No `theme.palette.mode` checks (use `theme.applyStyles()` instead)

## See Also

- **App-level patterns**: [app/AGENTS.md](app/AGENTS.md) - Detailed component patterns, routing, theming, and conventions
- **Cursor Rules**: `.cursor/rules/` - Project-specific rules for imports, MUI v7, and React Router v7
