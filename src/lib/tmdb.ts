// lib/tmdb.ts
export async function searchMovies(query: string) {
    const res = await fetch(`/api/search?query=${query}`); 
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch movies');
    }
    const data = await res.json();
    return data.results;
  }

  // export async function getMovieById(id: string) {
  //   const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  //   if (!res.ok) {
  //     const errorData = await res.json().catch(() => ({}));
  //     throw new Error(errorData.error || `Failed to fetch movie (${res.status})`);
  //   }
  //   return res.json();
  // }

  export async function getMovieById(id: string) {
    const res = await fetch(`/api/movie/${id}`);
  
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch movie (${res.status})`);
    }
  
    return res.json();
  }