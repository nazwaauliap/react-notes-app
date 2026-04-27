import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const { locale } = useContext(LocaleContext);

  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(
        locale === 'id'
          ? 'Password dan konfirmasi password harus sama'
          : 'Password and confirm password must match'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await register({ name, email, password });

      if (response.error) {
        alert(response.message);
        return;
      }

      alert(
        locale === 'id'
          ? 'Registrasi berhasil, silakan login'
          : 'Registration successful, please login'
      );
      navigate('/login');
    } catch (error) {
      alert(
        locale === 'id'
          ? 'Terjadi kesalahan saat registrasi'
          : 'An error occurred during registration'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="register-page">
      <h2>
        {locale === 'id'
          ? 'Isi form untuk mendaftar akun.'
          : 'Fill out the form to register an account.'}
      </h2>

      <form onSubmit={onSubmitHandler} className="input-register">
        <label htmlFor="name">
          {locale === 'id' ? 'Nama' : 'Name'}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={onNameChange}
          required
        />

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

        <label htmlFor="confirmPassword">
          {locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading
            ? 'Loading...'
            : (locale === 'id' ? 'Daftar' : 'Register')}
        </button>
      </form>

      <p>
        {locale === 'id' ? 'Sudah punya akun?' : 'Already have an account?'}{' '}
        <Link to="/login">
          {locale === 'id' ? 'Login di sini' : 'Login here'}
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;