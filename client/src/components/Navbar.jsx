import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
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
    <header>
      <nav className="navbar bg-base-100">
        <div className="flex-1">
          <button className="text-xl btn btn-ghost">Taskowdoro</button>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost"
            onClick={handleThemeChange}>
            {isDarkTheme && <Sun className="fill-current" />}
            {!isDarkTheme && <Moon className="fill-current" />}
          </button>
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
