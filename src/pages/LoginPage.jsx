import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login, getUserLogged } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function LoginPage({ onLoginSuccess }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoading(true);

    const { error, message } = await login({ email, password });

    if (error) {
      alert(message);
      setLoading(false);
      return;
    }

    const userResult = await getUserLogged();

    if (!userResult.error) {
      onLoginSuccess(userResult.data);
      navigate('/');
    }

    setLoading(false);
  }

  return (
    <section className="login-page">
      <h2>
        {locale === 'id'
          ? 'Yuk, login untuk menggunakan aplikasi.'
          : 'Login to use the app.'}
      </h2>

      <form onSubmit={onSubmitHandler} className="input-login">
        <label htmlFor="email">
          {locale === 'id' ? 'Email' : 'Email'}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          required
        />

        <label htmlFor="password">
          {locale === 'id' ? 'Password' : 'Password'}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading
            ? (locale === 'id' ? 'Loading...' : 'Loading...')
            : (locale === 'id' ? 'Login' : 'Login')}
        </button>
      </form>

      <p>
        {locale === 'id' ? 'Belum punya akun?' : "Don't have an account?"}{' '}
        <Link to="/register">
          {locale === 'id' ? 'Daftar di sini' : 'Register here'}
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;