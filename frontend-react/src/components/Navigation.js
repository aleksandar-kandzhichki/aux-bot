import React from 'react';
import { NavLink } from 'react-router-dom';
import { commandActions } from '../context/CommandContext';

const Navigation = () => {

  return (
    <nav className="main-nav">
      <ul>
        {commandActions.map(c =>
          <li><NavLink to={c.name} key={c.name}>{c.displayName}</NavLink></li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
