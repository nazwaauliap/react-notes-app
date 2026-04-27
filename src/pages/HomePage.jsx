import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { getActiveNotes } from '../utils/network-data';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);

      const { error, data } = await getActiveNotes();

      if (!error) {
        setNotes(data);
      }

      setLoading(false);
    }

    fetchNotes();
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
        <h2>Catatan Aktif</h2>
        <SearchBar keyword={keyword} onKeywordChange={onKeywordChange} />
        <NoteList notes={filteredNotes} emptyMessage="Tidak ada catatan" />
      </section>

      <div className="homepage__action">
        <Link to="/notes/new" className="action">+</Link>
      </div>
    </main>
  );
}

export default HomePage;