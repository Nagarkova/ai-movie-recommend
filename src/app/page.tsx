'use client';
import Link from 'next/link';
import { useState } from 'react';
import { searchMovies } from '@/lib/tmdb';
import Image from 'next/image';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{id: number, poster_path: string, title: string, vote_average: number}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const res = await searchMovies(encodeURIComponent(query));
      setResults(res || []);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎬 Movie Recommender</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="flex-1 px-4 py-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((movie) => (
          <Link 
            href={`/movie/${movie.id}`} 
            key={movie.id}
            className="bg-white rounded shadow p-2 hover:shadow-lg transition-shadow"
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2 w-full"
              />
            ) : (
              <div className="h-[450px] bg-gray-200 mb-2 rounded flex items-center justify-center">
                <span>No image</span>
              </div>
            )}
            <h2 className="text-sm font-semibold">{movie.title}</h2>
            <p className="text-xs text-gray-600">⭐ {movie.vote_average}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
