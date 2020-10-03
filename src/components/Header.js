import React from 'react';
import logo from '../images/logo.svg';

function Header() {

  //возврат разметки header
  return (
    <header className="header">
      <div className="header__logo" style={{ backgroundImage: `url(${logo})` }}></div>
    </header>
  );
}

export default Header;