import { createTheme } from '@mui/material/styles'

export const SIDEBAR_WIDTH = 256
export const SIDEBAR_COLLAPSED_WIDTH = 70

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#027af2', light: '#4da6ff', dark: '#0059b3' },
        secondary: { main: '#3ee07f' },
        error: { main: '#e31d1c' },
        warning: { main: '#ff8c1a' },
        info: { main: '#4da6ff' },
        success: { main: '#5eaa22' },
        background: {
          default: '#f5f6fa',
          paper: '#ffffff'
        },
        divider: '#dadee7',
        text: {
          primary: '#101318',
          secondary: '#56698f',
          disabled: '#94a0b8'
        }
      }
    },
    dark: {
      palette: {
        primary: { main: '#4da6ff', light: '#7dbfff', dark: '#2a8fff' },
        secondary: { main: '#4ade80' },
        error: { main: '#f87171' },
        warning: { main: '#fbbf24' },
        info: { main: '#60a5fa' },
        success: { main: '#4ade80' },
        background: {
          default: '#121621',
          paper: '#1e2532'
        },
        divider: '#333c4d',
        text: {
          primary: '#e8eaed',
          secondary: '#a8b1c4',
          disabled: '#6b7280'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
          /* Light mode custom variables */
          --color-bg: #f5f6fa;
          --color-surface: #ffffff;
          --color-card-bg: #ffffff;
          --color-card-elevated: #ffffff;
          --color-card-muted: #f7fcff;
          --color-chart-grid: rgba(148, 160, 184, 0.28);
          --color-chart-axis: #56698f;
          --color-chart-primary: #027af2;
          --color-chart-secondary: #3ee07f;
          --color-chart-tertiary: #ff8c1a;
          --color-hover: rgba(0, 0, 0, 0.04);
          --color-active: rgba(0, 0, 0, 0.08);
          --color-selected: rgba(2, 122, 242, 0.08);
          --color-focus: rgba(2, 122, 242, 0.16);
          --color-flag-bg: rgba(148, 160, 184, 0.16);
          --color-flag-border: rgba(148, 160, 184, 0.32);
          --color-sidebar-bg: #ffffff;
          --color-navbar-bg: #ffffff;
          --color-border: #dadee7;
          --color-border-subtle: rgba(218, 222, 231, 0.5);
          --color-border-strong: #c5cad5;
          --color-success: #5eaa22;
          --color-success-bg: rgba(94, 170, 34, 0.08);
          --color-success-border: rgba(94, 170, 34, 0.24);
          --color-error: #e31d1c;
          --color-error-bg: rgba(227, 29, 28, 0.08);
          --color-error-border: rgba(227, 29, 28, 0.24);
          --color-warning: #ff8c1a;
          --color-warning-bg: rgba(255, 140, 26, 0.08);
          --color-warning-border: rgba(255, 140, 26, 0.24);
          --color-info: #4da6ff;
          --color-info-bg: rgba(77, 166, 255, 0.08);
          --color-info-border: rgba(77, 166, 255, 0.24);
        }
        
        .dark, [data-mui-color-scheme="dark"] {
          /* Dark mode custom variables */
          --color-bg: #121621;
          --color-surface: #1a1f2e;
          --color-card-bg: #1e2532;
          --color-card-elevated: #262f40;
          --color-card-muted: #2a3441;
          --color-chart-grid: rgba(255, 255, 255, 0.08);
          --color-chart-axis: #8c9bb5;
          --color-chart-primary: rgba(77, 166, 255, 0.85);
          --color-chart-secondary: rgba(74, 222, 128, 0.75);
          --color-chart-tertiary: rgba(251, 191, 36, 0.75);
          --color-hover: rgba(255, 255, 255, 0.08);
          --color-active: rgba(255, 255, 255, 0.12);
          --color-selected: rgba(77, 166, 255, 0.16);
          --color-focus: rgba(77, 166, 255, 0.24);
          --color-flag-bg: rgba(255, 255, 255, 0.08);
          --color-flag-border: rgba(255, 255, 255, 0.16);
          --color-sidebar-bg: #1a1f2e;
          --color-navbar-bg: #1a1f2e;
          --color-border: rgba(51, 60, 77, 0.8);
          --color-border-subtle: rgba(51, 60, 77, 0.4);
          --color-border-strong: rgba(51, 60, 77, 1);
          --color-success: #4ade80;
          --color-success-bg: rgba(74, 222, 128, 0.12);
          --color-success-border: rgba(74, 222, 128, 0.24);
          --color-error: #f87171;
          --color-error-bg: rgba(248, 113, 113, 0.12);
          --color-error-border: rgba(248, 113, 113, 0.24);
          --color-warning: #fbbf24;
          --color-warning-bg: rgba(251, 191, 36, 0.12);
          --color-warning-border: rgba(251, 191, 36, 0.24);
          --color-info: #60a5fa;
          --color-info-bg: rgba(96, 165, 250, 0.12);
          --color-info-border: rgba(96, 165, 250, 0.24);
        }
        
        html {
          scrollbar-width: auto;
          scrollbar-color: #94a0b8 transparent;
        }
        
        .dark html, [data-mui-color-scheme="dark"] html {
          scrollbar-color: #566481 transparent;
        }
        
        *::-webkit-scrollbar {
          height: 10px;
          width: 10px;
        }
        
        *::-webkit-scrollbar-thumb {
          background-color: rgba(148, 160, 184, 0.4);
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        
        .dark *::-webkit-scrollbar-thumb, [data-mui-color-scheme="dark"] *::-webkit-scrollbar-thumb {
          background-color: rgba(86, 100, 129, 0.6);
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background-color: rgba(148, 160, 184, 0.6);
        }
        
        .dark *::-webkit-scrollbar-thumb:hover, [data-mui-color-scheme="dark"] *::-webkit-scrollbar-thumb:hover {
          background-color: rgba(86, 100, 129, 0.8);
        }
        
        *::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none'
        }
      }
    }
  }
})

export default theme
