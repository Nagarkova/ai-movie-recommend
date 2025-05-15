import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie/${params.id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return notFound();

  const movie = await res.json();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      {posterUrl && (
        <Image
          src={posterUrl}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded shadow-md mb-4"
        />
      )}

      <p className="text-lg mb-2">{movie.overview}</p>
      <p className="text-gray-600">Release date: {movie.release_date}</p>
    </div>
  );
}