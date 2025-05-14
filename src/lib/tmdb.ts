// lib/tmdb.ts

export async function searchMovies(query: string) {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}?api_key=${apiKey}&query=${query}`);
    const data = await res.json();
    return data.results;
  }
  