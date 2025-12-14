export type Mode = 'light' | 'dark' | 'system'
export type EffectiveMode = 'light' | 'dark'

// CSS Variable names for custom color tokens
export type ColorVariable =
  // Background layers
  | '--color-bg'
  | '--color-surface'
  | '--color-card-bg'
  | '--color-card-elevated'
  | '--color-card-muted'
  // Chart colors
  | '--color-chart-grid'
  | '--color-chart-axis'
  | '--color-chart-primary'
  | '--color-chart-secondary'
  | '--color-chart-tertiary'
  // Interactive states
  | '--color-hover'
  | '--color-active'
  | '--color-selected'
  | '--color-focus'
  // Flag & badges
  | '--color-flag-bg'
  | '--color-flag-border'
  // Navigation
  | '--color-sidebar-bg'
  | '--color-navbar-bg'
  // Borders
  | '--color-border'
  | '--color-border-subtle'
  | '--color-border-strong'
  // Status colors
  | '--color-success'
  | '--color-success-bg'
  | '--color-success-border'
  | '--color-error'
  | '--color-error-bg'
  | '--color-error-border'
  | '--color-warning'
  | '--color-warning-bg'
  | '--color-warning-border'
  | '--color-info'
  | '--color-info-bg'
  | '--color-info-border'
