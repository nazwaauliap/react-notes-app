import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';
import { getUserLogged, putAccessToken } from './utils/network-data';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

  useEffect(() => {
    async function fetchUser() {
      const { error, data } = await getUserLogged();

      if (!error) {
        setAuthedUser(data);
      }

      setInitializing(false);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  function onLoginSuccess(user) {
    setAuthedUser(user);
  }

  function onLogout() {
    putAccessToken('');
    localStorage.removeItem('accessToken');
    setAuthedUser(null);
  }

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  function toggleLocale() {
    setLocale((prevLocale) => (prevLocale === 'id' ? 'en' : 'id'));
  }

  const themeContextValue = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);

  const localeContextValue = useMemo(() => ({
    locale,
    toggleLocale,
  }), [locale]);

  if (initializing) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container">
          <Header
            name={authedUser ? authedUser.name : null}
            onLogout={onLogout}
          />

          <Routes>
            {!authedUser ? (
              <>
                <Route
                  path="/login"
                  element={<LoginPage onLoginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/archives" element={<ArchivePage />} />
                <Route path="/notes/new" element={<AddPage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/register" element={<Navigate to="/" />} />
                <Route path="*" element={<NotFoundPage />} />
              </>
            )}
          </Routes>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;