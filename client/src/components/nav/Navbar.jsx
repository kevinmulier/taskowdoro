import ThemeChangeButton from '../buttons/ThemeChangeButton';

const Navbar = () => {
  return (
    <header className="mb-2 md:mb-10 bg-base-100">
      <nav className="mx-auto max-w-7xl navbar">
        <div className="flex-1">
          <button className="text-xl btn btn-ghost">Taskowdoro</button>
        </div>
        <div className="flex-none">
          <ThemeChangeButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
