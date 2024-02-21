import ThemeChangeButton from './buttons/ThemeChangeButton';

const Navbar = () => {
  return (
    <header className="mb-10 bg-base-100">
      <nav className="mx-auto max-w-7xl navbar">
        <div className="flex-1">
          <button className="text-xl btn btn-ghost">Taskowdoro</button>
        </div>
        <div className="flex-none">
          <ThemeChangeButton />
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
