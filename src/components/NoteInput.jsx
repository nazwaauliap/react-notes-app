import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NoteInput({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function onTitleChangeHandler(event) {
    const value = event.target.value;

    if (value.length <= 50) {
      setTitle(value);
    }
  }

  function onBodyChangeHandler(event) {
    setBody(event.target.value);
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert('Judul dan isi catatan wajib diisi');
      return;
    }

    addNote({ title, body });
  }

  return (
    <form className="add-new-page__input" onSubmit={onSubmitHandler}>
      <p className="add-new-page__input__title__char-limit">
        Sisa karakter: {50 - title.length}
      </p>

      <input
        className="add-new-page__input__title"
        type="text"
        placeholder="Ini adalah judul ..."
        value={title}
        onChange={onTitleChangeHandler}
        required
      />

      <textarea
        className="add-new-page__input__body"
        placeholder="Tuliskan catatanmu di sini ..."
        value={body}
        onChange={onBodyChangeHandler}
        required
      />

      <button className="add-new-page__input__body__submit" type="submit">
        Buat
      </button>
    </form>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;