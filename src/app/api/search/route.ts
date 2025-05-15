import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const API = process.env.NEXT_PUBLIC_API;
    const response = await fetch(
      `${API}?api_key=${TMDB_API_KEY}&query=${query}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from TMDB');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}
