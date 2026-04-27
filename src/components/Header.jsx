import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

function Header({ name, onLogout }) {
  const location = useLocation();
  const isArchivePage = location.pathname === '/archives';
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <header>
      <h1>
        <Link to="/">Aplikasi Catatan</Link>
      </h1>

      {name && (
        <nav className="navigation">
          <ul>
            <li>
              {isArchivePage ? (
                <Link to="/">{locale === 'id' ? 'Beranda' : 'Home'}</Link>
              ) : (
                <Link to="/archives">{locale === 'id' ? 'Arsip' : 'Archived'}</Link>
              )}
            </li>
            <li>
              <Link to="/notes/new">{locale === 'id' ? 'Tambah' : 'Add'}</Link>
            </li>
          </ul>
        </nav>
      )}

      <div className="header-user">
        <button onClick={toggleLocale} className="locale-toggle">
          {locale === 'id' ? 'EN' : 'ID'}
        </button>

        <button onClick={toggleTheme} className="theme-toggle">
          <span className="theme-icon">
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
        </button>

        {name && (
          <span>
            {locale === 'id' ? 'Halo' : 'Hi'}, {name}
          </span>
        )}

        {name && (
          <button onClick={onLogout}>
            {locale === 'id' ? 'Logout' : 'Logout'}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;