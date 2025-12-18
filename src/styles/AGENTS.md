## Package identity

- **Purpose**: Global CSS styles and CSS variable system
- **Tech**: Plain CSS (imported in `main.tsx`)

## Files

| File | Purpose |
|------|---------|
| `index.css` | Global styles, resets, font imports |

## CSS variable system

CSS variables are defined in `src/theme.ts` via MUI's `MuiCssBaseline` styleOverrides.

### Light mode (`:root`)

```css
:root {
  --color-bg: #f5f6fa;
  --color-surface: #ffffff;
  --color-card-bg: #ffffff;
  --color-card-elevated: #ffffff;
  --color-card-muted: #f7fcff;
  --color-border: #dadee7;
  --color-hover: rgba(0, 0, 0, 0.04);
  --color-success: #5eaa22;
  --color-error: #e31d1c;
  --color-warning: #ff8c1a;
  --color-info: #4da6ff;
  /* ... more in src/theme.ts */
}
```

### Dark mode (`.dark`, `[data-mui-color-scheme="dark"]`)

```css
.dark, [data-mui-color-scheme='dark'] {
  --color-bg: #121621;
  --color-surface: #1a1f2e;
  --color-card-bg: #1e2532;
  --color-card-elevated: #262f40;
  --color-card-muted: #2a3441;
  --color-border: rgba(51, 60, 77, 0.8);
  --color-hover: rgba(255, 255, 255, 0.08);
  /* ... more in src/theme.ts */
}
```

## Patterns & conventions

### Using CSS variables in components

```tsx
// ✅ DO: Use CSS variables for theme-aware colors
sx={{
  bgcolor: 'var(--color-card-bg)',
  border: '1px solid var(--color-border)',
  '&:hover': { bgcolor: 'var(--color-hover)' }
}}

// ✅ DO: Combine with MUI palette
sx={{
  color: 'text.primary',           // MUI palette
  bgcolor: 'var(--color-card-bg)'  // CSS variable
}}

// ❌ DON'T: Hardcode colors that need dark mode support
sx={{ bgcolor: '#ffffff' }}  // Won't adapt to dark mode
```

### When to use what

| Use case | Solution |
|----------|----------|
| Standard semantic colors | MUI palette: `'text.primary'`, `'background.paper'` |
| Custom themed colors | CSS variables: `'var(--color-card-bg)'` |
| One-off static colors | Direct hex (only if no dark mode needed) |
| Dynamic dark mode styles | `theme.applyStyles('dark', {...})` |

### Adding new CSS variables

1. Add to BOTH light and dark sections in `src/theme.ts`:

```ts
// In MuiCssBaseline.styleOverrides
`:root {
  --color-new-var: #value;
}

.dark, [data-mui-color-scheme="dark"] {
  --color-new-var: #dark-value;
}`
```

2. Use in components:

```tsx
sx={{ color: 'var(--color-new-var)' }}
```

## Available CSS variables

### Background colors
- `--color-bg` — Main page background
- `--color-surface` — Surface/elevated background
- `--color-card-bg` — Card background
- `--color-card-elevated` — Elevated card
- `--color-card-muted` — Muted/subtle card

### Borders
- `--color-border` — Default border
- `--color-border-subtle` — Subtle border
- `--color-border-strong` — Strong border

### Interactive states
- `--color-hover` — Hover background
- `--color-active` — Active/pressed background
- `--color-selected` — Selected state
- `--color-focus` — Focus ring

### Status colors
- `--color-success` / `--color-success-bg` / `--color-success-border`
- `--color-error` / `--color-error-bg` / `--color-error-border`
- `--color-warning` / `--color-warning-bg` / `--color-warning-border`
- `--color-info` / `--color-info-bg` / `--color-info-border`

### Layout
- `--color-sidebar-bg` — Sidebar background
- `--color-navbar-bg` — Navbar background

### Charts
- `--color-chart-grid` — Grid lines
- `--color-chart-axis` — Axis text
- `--color-chart-primary` / `secondary` / `tertiary` — Chart series colors

## JIT hints

```bash
# Find all CSS variable definitions
rg -n "--color-" src/theme.ts

# Find CSS variable usage
rg -n "var\(--color-" src

# Find global styles
rg -n "MuiCssBaseline" src/theme.ts
```

## Common gotchas

- **Theme is the source of truth**: Variables defined in `src/theme.ts`, not `src/styles/`
- **Both modes required**: Add to BOTH `:root` and `.dark` selectors
- **Naming convention**: Use `--color-` prefix for color variables
- **Don't duplicate**: Check MUI palette before creating new variables

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```
