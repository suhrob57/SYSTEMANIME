import { useEffect, useState } from "react";
import AnimeCard from "@/components/AnimeCard";

export default function Home() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("/api/animes")
      .then(res => res.json())
      .then(data => setAnimes(data));
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {animes.map(anime => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}
