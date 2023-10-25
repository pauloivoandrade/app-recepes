import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar'; // Ajuste o caminho do import se necessário

export function Header() {
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const renderProfileIcon = () => (
    <Link
      to="/profile"
      className="iconButton"
      aria-label="Perfil"
    >
      <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
    </Link>
  );

  const renderSearchIcon = () => {
    const routesWithSearchIcon = ['/meals', '/drinks'];

    if (routesWithSearchIcon.includes(location.pathname)) {
      return (
        <button
          onClick={ toggleSearchBar }
          onKeyDown={ (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleSearchBar();
            }
          } }
        >
          <img
            src={ searchIcon }
            alt="Search"
            data-testid="search-top-btn"
          />
        </button>
      );
    }
    return null;
  };

  const renderSearchComponent = () => (
    showSearchBar ? <SearchBar /> : null
  );

  const renderTitle = () => {
    switch (location.pathname) {
      case '/meals': return 'Meals';
      case '/drinks': return 'Drinks';
      case '/profile': return 'Profile';
      case '/done-recipes': return 'Done Recipes';
      case '/favorite-recipes': return 'Favorite Recipes';
      default: return '';
    }
  };

  const noHeaderRoutes = [
    '/',
    /^\/meals\/[^/]+$/,
    /^\/drinks\/[^/]+$/,
    /^\/meals\/[^/]+\/in-progress$/,
    /^\/drinks\/[^/]+\/in-progress$/,
  ];

  if (noHeaderRoutes.some(
    (pattern) => (
      typeof pattern === 'string'
        ? location.pathname === pattern : pattern.test(location.pathname)),
  )) {
    return null;
  }

  return (
    <div className="header">
      {renderProfileIcon()}
      {renderSearchIcon()}
      {renderSearchComponent()}
      <h1 data-testid="page-title">{renderTitle()}</h1>
    </div>
  );
}
