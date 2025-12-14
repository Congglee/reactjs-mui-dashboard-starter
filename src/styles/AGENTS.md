## Package identity

- **Purpose**: Global CSS styles and CSS variable definitions.
- **Tech**: Plain CSS (imported in `main.tsx`).

## Files

| File        | Purpose                             |
| ----------- | ----------------------------------- |
| `index.css` | Global styles, resets, font imports |

## CSS variable system

CSS variables are defined in `src/theme.ts` via MUI's `MuiCssBaseline` styleOverrides:

### Light mode variables (`:root`)

```css
:root {
  --color-bg: #f5f6fa;
  --color-surface: #ffffff;
  --color-card-bg: #ffffff;
  --color-card-elevated: #ffffff;
  --color-border: #dadee7;
  --color-hover: rgba(0, 0, 0, 0.04);
  --color-success: #5eaa22;
  --color-error: #e31d1c;
  /* ... etc */
}
```

### Dark mode variables (`.dark`, `[data-mui-color-scheme="dark"]`)

```css
.dark,
[data-mui-color-scheme='dark'] {
  --color-bg: #121621;
  --color-surface: #1a1f2e;
  --color-card-bg: #1e2532;
  --color-card-elevated: #262f40;
  --color-border: rgba(51, 60, 77, 0.8);
  --color-hover: rgba(255, 255, 255, 0.08);
  /* ... etc */
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

// ✅ DO: Combine with MUI palette when needed
sx={{
  color: 'text.primary',           // MUI palette
  bgcolor: 'var(--color-card-bg)'  // CSS variable
}}

// ❌ DON'T: Hardcode colors that need dark mode support
sx={{ bgcolor: '#ffffff' }}  // Won't adapt to dark mode
```

### When to use what

| Use case                 | Solution                                            |
| ------------------------ | --------------------------------------------------- |
| Standard semantic colors | MUI palette: `'text.primary'`, `'background.paper'` |
| Custom themed colors     | CSS variables: `'var(--color-card-bg)'`             |
| One-off static colors    | Direct hex (only if no dark mode needed)            |
| Dynamic dark mode styles | `theme.applyStyles('dark', {...})`                  |

### Adding new CSS variables

1. Add to both light and dark sections in `src/theme.ts`:

```ts
// In MuiCssBaseline.styleOverrides
;`:root {
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

## JIT hints

```bash
# Find all CSS variable definitions
rg -n "var\(--color-" src/theme.ts

# Find CSS variable usage in components
rg -n "var\(--color-" src/components

# Find global styles
rg -n "MuiCssBaseline" src/theme.ts
```

## Common gotchas

- **Theme is the source of truth**: CSS variables are defined in `src/theme.ts`, not in `src/styles/`.
- **Both modes required**: When adding a CSS variable, add it to BOTH `:root` and `.dark` selectors.
- **Naming convention**: Use `--color-` prefix for color variables.
- **Don't duplicate**: Check if MUI palette already has what you need before creating a new variable.

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```
