// app/api/movie/[id]/route.ts

import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`
  );
  console.log(res);
  if (!res.ok) {
    return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
