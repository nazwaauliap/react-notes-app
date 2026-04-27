import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { getArchivedNotes } from '../utils/network-data';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    async function fetchArchivedNotes() {
      setLoading(true);

      const { error, data } = await getArchivedNotes();

      if (!error) {
        setNotes(data);
      }

      setLoading(false);
    }

    fetchArchivedNotes();
  }, []);

  function onKeywordChange(keywordValue) {
    setSearchParams(keywordValue ? { keyword: keywordValue } : {});
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <section className="homepage">
        <h2>Catatan Arsip</h2>
        <SearchBar keyword={keyword} onKeywordChange={onKeywordChange} />
        <NoteList notes={filteredNotes} emptyMessage="Arsip kosong" />
      </section>

      <div className="homepage__action">
        <Link to="/notes/new" className="action">+</Link>
      </div>
    </main>
  );
}

export default ArchivePage;