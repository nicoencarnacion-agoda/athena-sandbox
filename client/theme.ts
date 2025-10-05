import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      light: '#E3F2FD',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#455A64',
    },
    background: {
      default: '#FFF',
      paper: '#FFF',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.60)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    warning: {
      main: '#FFA726',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#0288D1',
    },
    success: {
      main: '#2E7D32',
    },
  },
  typography: {
    fontFamily: 'Roboto, -apple-system, Helvetica, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
