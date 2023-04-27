import React from 'react';
import Icon from '@/utils/getIcon';

const Header: React.FC = () => {
  return (
    <header className="h-16 w-full sticky top-0 z-10">
      <div className="container mx-auto flex justify-center items-center h-full px-4 lg:px-0">
        <div id="nav-logo" className="">
          <Icon
            name="logo-simple"
            className="h-6 w-6 -translate-y-1 stroke-pucci-500"
          />
        </div>
        <div
          id="navlist"
          className="text-pucci-500 hidden lg:hidden gap-4 items-center"
        >
          <nav className="hover:text-pucci-100 transition-colors">
            <a href="#">Início</a>
          </nav>
          <nav className="hover:text-pucci-100 transition-colors">
            <a href="#">A Artista</a>
          </nav>
          <nav className="hover:text-pucci-100 transition-colors">
            <a href="#">Laboratório</a>
          </nav>
          <nav className="hover:text-pucci-100 transition-colors">
            <a href="#">Portfolio</a>
          </nav>
          <nav className="hover:text-pucci-100 transition-colors">
            <a href="#">Contato</a>
          </nav>
          <button
            disabled
            title="Em breve"
            className="bg-pucci-500 hover:bg-pucci-100 text-white transition-all py-2 px-4 w-fit font-medium cursor-not-allowed"
          >
            Acessar o sistema
          </button>
        </div>
        <button
          id="sm-navlist"
          className="hidden lg:hidden stroke-pucci-500 hover:stroke-pucci-100"
        >
          <Icon name="hamburger-menu" className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
};

export default Header;
