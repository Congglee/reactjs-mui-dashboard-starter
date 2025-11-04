# Project Context

## Purpose

**Nexus Dashboard Starter** is a production-ready boilerplate template for building modern dashboard applications. It provides a solid foundation with:

- Pre-configured React Router v7 Framework Mode with SSR
- Material-UI v7 theme system with dark mode support
- Dashboard layout with sidebar, navbar, and responsive design
- Example components demonstrating MUI v7 patterns
- TypeScript strict mode with full type safety
- OpenSpec integration for spec-driven development

**Goals:**

- Enable rapid development of dashboard applications
- Demonstrate best practices for React Router v7 and MUI v7
- Provide a maintainable, scalable codebase structure
- Serve as a reference implementation for modern React patterns

## Tech Stack

### Core Framework

- **React 19** - Latest React with concurrent features
- **React Router v7** - Framework Mode with file-based routing and SSR
- **TypeScript 5.8** - Strict mode enabled for type safety
- **Vite 6** - Build tool and dev server with HMR

### UI Library

- **Material-UI v7** - Exclusive UI library (no other UI frameworks)
  - `@mui/material` - Core components
  - `@mui/icons-material` - Icon library
  - `@mui/x-data-grid` - Data grid component
  - `@mui/x-charts` - Chart components
  - `@mui/x-date-pickers` - Date picker components
  - `@mui/x-tree-view` - Tree view component
  - `@mui/lab` - Experimental components

### Styling & Theming

- **Emotion** - CSS-in-JS (via MUI)
- **CSS Variables** - Theme system with light/dark mode support
- **sx prop** - Primary styling method for components

### State Management

- **React Context API** - Global state (via `app/providers/`)
- **TanStack Query v5** - Planned for future integration

### Development Tools

- **ESLint** - Code linting with TypeScript ESLint
- **Prettier** - Code formatting
- **React Router Typegen** - Automatic route type generation

### Spec-Driven Development

- **OpenSpec** - Change proposals and capability specifications
- Specs live in `openspec/specs/`
- Changes tracked in `openspec/changes/`

## Project Conventions

### Code Style

**TypeScript:**

- Strict mode enabled (`strict: true`)
- Path alias `@/*` maps to `app/*`
- Always use explicit types, avoid `any`
- Use `satisfies` for type-safe configurations

**File Naming:**

- Components: kebab-case (e.g., `nav-item.tsx`, `metric-card.tsx`)
- Routes: kebab-case (e.g., `home.tsx`, `dashboard/index.tsx`)
- Icons: kebab-case with `-icon` suffix (e.g., `analytics-icon.tsx`)
- Types: kebab-case (e.g., `theme.types.ts`)

**Imports:**

- **MUST** use absolute `@/` alias for all app code
- **NEVER** use relative imports (`./`, `../`)
- Tree-shake MUI imports: `import Button from '@mui/material/Button'`
- Import icons individually: `import DeleteIcon from '@mui/icons-material/Delete'`

**Formatting:**

- Prettier configured (run `npm run prettier:fix` before commits)
- ESLint with React Hooks and React Refresh plugins
- 2-space indentation (default)

### Architecture Patterns

**File-Based Routing:**

- Routes defined in `app/routes/` directory
- Route configuration in `app/routes.ts`
- Automatic type generation via React Router typegen
- Layouts wrap routes via `layout()` configuration

**Component Organization:**

```
app/
├── assets/         # Static assets (images, fonts)
├── components/     # Reusable UI components (organized by feature)
│   ├── dashboard/  # Dashboard-specific components
│   ├── home/       # Home page components
│   └── icons/      # Custom icon components
├── constants/      # Constants and mock data
├── hooks/          # Custom React hooks (planned)
├── layouts/        # Layout wrappers for routes
├── lib/            # External library wrappers (planned)
├── providers/      # React Context providers
├── queries/        # TanStack Query hooks (planned)
├── routes/         # Route components (file-based routing)
├── styles/         # Global CSS styles
├── tests/          # Test files (planned)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions (planned)
├── root.tsx        # Root component entry point
├── routes.ts       # Route configuration
└── theme.ts        # MUI theme configuration
```

**State Management:**

- React Context API for global state (sidebar state, theme preferences)
- Context providers in `app/providers/`
- Custom hooks exported from providers (e.g., `useAppContext()`)

**Styling Approach:**

- Primary: `sx` prop for component-level styling
- Secondary: `styled` only for global reusable components shared across routes
- Theme: CSS variables via `theme.vars.*` for light/dark mode
- Dark mode: Use `theme.applyStyles('dark', {...})` - **NEVER** check `theme.palette.mode`

**SSR & Performance:**

- Server-side rendering enabled by default
- `InitColorSchemeScript` prevents dark mode flicker
- MUI X packages in Vite `ssr.noExternal` for proper SSR
- Tree-shaking enabled for optimal bundle size

### Testing Strategy

**Current Status:** Not yet configured (planned for future integration)

**Planned Approach:**

- Unit tests for components and utilities
- Integration tests for routes and layouts
- E2E tests for critical user flows
- Testing framework to be determined

### Git Workflow

**Branching:**

- `main` branch for production-ready code
- Feature branches for new features/changes
- Conventional commit format preferred

**Commit Format:**

- Follow conventional commits when possible
- Examples: `feat: add user dashboard`, `fix: resolve sidebar toggle`, `docs: update README`

**Pre-Commit Checks:**

```bash
npm run typecheck && npm run lint && npm run prettier && npm run build
```

**Pull Request Requirements:**

- All checks must pass (`typecheck`, `lint`, `prettier`, `build`)
- All imports must use `@/` alias
- File names must follow kebab-case convention
- MUI v7 patterns must be followed (no deprecated APIs)
- No `theme.palette.mode` checks (use `theme.applyStyles()` instead)

## Domain Context

**Dashboard Application Starter:**

- Provides dashboard layout with sidebar navigation
- Includes example components: metric cards, charts, data tables, tree views
- Mock data for demonstration purposes
- Responsive design for mobile and desktop
- Theme switching (light/dark mode)

**Key Features:**

- Sidebar navigation with collapsible state
- Top navbar with user profile menu and theme switcher
- Dashboard page with metrics, charts, and data visualization
- Home page with hero section
- Reusable components for common dashboard patterns

**Component Examples:**

- Metric cards with trend indicators
- Chart cards with MUI X Charts
- Data tables with MUI X Data Grid
- Tree views with MUI X Tree View
- Date pickers with MUI X Date Pickers

## Important Constraints

**UI Library:**

- **Material-UI v7 ONLY** - No other UI libraries allowed
- Must use tree-shaking imports (no barrel imports)
- Icons from `@mui/icons-material` only (custom icons via `SvgIcon`)

**TypeScript:**

- Strict mode required (`strict: true`)
- No `any` types without explicit justification
- Path aliases required (`@/` for app code)

**Imports:**

- **MUST** use absolute `@/` imports
- **NEVER** use relative imports (`./`, `../`)
- Violations should be caught by linting

**Dark Mode:**

- **NEVER** check `theme.palette.mode` directly
- Use `theme.applyStyles('dark', {...})` instead
- Prefer CSS variables via `theme.vars.*`
- Prevents SSR flicker issues

**Grid Component:**

- Must use MUI v7 Grid API (`size` prop, not `xs={12}`)
- No `item` prop (removed in v7)
- Use `container` prop for grid containers

**MUI X Packages:**

- Must be in Vite `ssr.noExternal` configuration
- Required for proper SSR support

**React Router:**

- File-based routing only (no manual route configuration)
- Route types auto-generated in `.react-router/types/`
- Always verify API against latest docs (React Router v7 is evolving)

## External Dependencies

### UI Libraries

- **Material-UI v7** - Complete UI component library
- **MUI X** - Advanced components (data grid, charts, date pickers, tree view)

### Routing & SSR

- **React Router v7** - Framework Mode with SSR support
- **@react-router/node** - Server-side rendering
- **@react-router/serve** - Production server

### Utilities

- **dayjs** - Date manipulation
- **country-flag-icons** - Country flag display
- **isbot** - Bot detection for SSR

### Development

- **Vite** - Build tool and dev server
- **TypeScript ESLint** - TypeScript linting
- **Prettier** - Code formatting
- **OpenSpec** - Spec-driven development tooling

### Build Output

- Static assets: `build/client/`
- Server code: `build/server/`
- Type definitions: `.react-router/types/`

### Environment Variables

- Stored in `.env` (not version controlled)
- Never commit `.env` files
- Build outputs (`build/`, `.react-router/`) are gitignored
