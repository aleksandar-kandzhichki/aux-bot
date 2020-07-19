import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { availableCommands } from '../context/CommandContext';

const Navigation = () => {

  return (
    <nav className="main-nav">
      <ul>
        {availableCommands.map(c =>
          <li><NavLink to={c.name}>{c.displayName}</NavLink></li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
