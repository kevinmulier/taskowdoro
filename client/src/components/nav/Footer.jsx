import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="gap-2 p-3 footer footer-center text-base-content">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.linkedin.com/in/kevin-mulier/">
            <Linkedin className="hover:text-base-content/80" />
          </a>
          <a href="https://github.com/kevinmulier">
            <Github className="hover:text-base-content/80" />
          </a>
        </div>
      </nav>
      <aside>
        <p className="font-semibold">
          Created by <span className="font-bold">Kevin Mulier</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
