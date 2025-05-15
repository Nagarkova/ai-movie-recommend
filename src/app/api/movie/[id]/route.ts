// app/api/movie/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Missing movie ID' }, { status: 400 });
  }

  const apiKey = process.env.TMDB_API_KEY; // This key should NOT be public

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: errorData.status_message || 'Failed to fetch movie' },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
