import { useState } from 'react';

const themeObject = {
  palette: {
    primary: { main: '#053f5b' },
    type: 'dark'
  }
};

export const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject);
  const {
    palette: { type }
  } = theme;

  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light'
      }
    };
    setTheme(updatedTheme);
  };
  return [theme, toggleDarkMode];
};
