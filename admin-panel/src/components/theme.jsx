import { defaultTheme } from 'react-admin';
import merge from 'lodash/merge';

export const myTheme = merge({}, defaultTheme, {
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#122230',
      contrastText: '#f7f5f2',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#122230',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#f7f5f2',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: '#000000',
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
      contrastText: '#000000',
    },
    contrastThreshold: 10,
    tonalOffset: 2,
    type: 'light',
  },
  typography: {
    fontFamily: 'Raleway, Arial',
    fontSize: 15,
  },
  overrides: {
    MuiButton: {
      root: {
        color: 'red',
      },
    },
  },
});
