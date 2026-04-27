import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';
import ArchiveButton from '../components/ArchiveButton';
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from '../utils/network-data';
import { showFormattedDate } from '../utils';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchNote() {
      setLoading(true);

      const { error, data } = await getNote(id);

      if (error) {
        setNotFound(true);
      } else {
        setNote(data);
      }

      setLoading(false);
    }

    fetchNote();
  }, [id]);

  async function onDeleteHandler() {
    const { error } = await deleteNote(id);

    if (!error) {
      navigate(note.archived ? '/archives' : '/');
    }
  }

  async function onArchiveHandler() {
    if (note.archived) {
      const { error } = await unarchiveNote(id);

      if (!error) {
        navigate('/');
      }
      return;
    }

    const { error } = await archiveNote(id);

    if (!error) {
      navigate('/archives');
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (notFound || !note) {
    return (
      <section className="detail-page">
        <p>Catatan tidak ditemukan.</p>
        <Link to="/">Kembali</Link>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">
        {showFormattedDate(note.createdAt)}
      </p>
      <p className="detail-page__body">{note.body}</p>

      <div className="detail-page__action">
        <ArchiveButton archived={note.archived} onArchive={onArchiveHandler} />
        <DeleteButton onDelete={onDeleteHandler} />
      </div>
    </section>
  );
}

export default DetailPage;