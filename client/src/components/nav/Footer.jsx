import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="absolute bottom-0 gap-2 p-3 footer footer-center text-base-content">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.linkedin.com/in/kevin-mulier/">
            <Linkedin />
          </a>
          <a href="https://github.com/kevinmulier">
            <Github />
          </a>
        </div>
      </nav>
      <aside>
        <p className="font-bold">Created by Kevin Mulier</p>
      </aside>
    </footer>
  );
};

export default Footer;
