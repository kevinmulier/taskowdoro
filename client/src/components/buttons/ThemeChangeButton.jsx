import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeChangeButton = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const darkTheme = JSON.parse(localStorage.getItem('darkTheme'));
    setIsDarkTheme(darkTheme !== null ? darkTheme : true);
    document.documentElement.setAttribute(
      'data-theme',
      darkTheme ? 'sunset' : 'nord',
    );
  }, []);

  const handleThemeChange = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('darkTheme', JSON.stringify(newTheme));
    document.documentElement.setAttribute(
      'data-theme',
      newTheme ? 'sunset' : 'nord',
    );
  };

  return (
    <button
      className="btn btn-square btn-ghost theme-switcher-button"
      onClick={handleThemeChange}>
      {isDarkTheme && <Sun className="fill-current" />}
      {!isDarkTheme && <Moon className="fill-current" />}
    </button>
  );
};

export default ThemeChangeButton;
