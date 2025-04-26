// pages/index.js
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase'; // Firebase-dan import qilish
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  // Animelar ro'yxatini saqlash uchun state
  const [animes, setAnimes] = useState([]);

  // Firebase-dan animelarni olish
  useEffect(() => {
    const fetchAnimes = async () => {
      const querySnapshot = await getDocs(collection(db, 'animes'));
      const animeList = [];
      querySnapshot.forEach((doc) => {
        animeList.push({ id: doc.id, ...doc.data() });
      });
      setAnimes(animeList);
    };

    fetchAnimes();
  }, []);

  return (
    <div>
      <h1>Anime ro'yxati</h1>
      <div>
        {animes.length === 0 ? (
          <p>Animelar yuklanmoqda...</p>
        ) : (
          <ul>
            {animes.map((anime) => (
              <li key={anime.id}>
                <h2>{anime.name}</h2>
                <p>{anime.description}</p>
                <p>Qism: {anime.parts}</p>
                <button>Like</button> {/* Like tugmasi */}
                <button>Comment</button> {/* Comment tugmasi */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
