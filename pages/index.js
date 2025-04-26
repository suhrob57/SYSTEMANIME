// pages/index.js
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase'; // Firebase-dan import qilish
import { collection, getDocs, updateDoc, doc, increment } from 'firebase/firestore'; // updateDoc va increment import qilish

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

  // Like funksiyasi
  const handleLike = async (animeId) => {
    const animeRef = doc(db, 'animes', animeId);
    await updateDoc(animeRef, {
      likes: increment(1), // Like sonini birga oshiramiz
    });
  };

  // Comment funksiyasi (hozircha faqat loglash)
  const handleComment = (animeId) => {
    console.log(`Comment uchun animeId: ${animeId}`);
    // Koment qo'shish logikasini shu yerda yozishingiz mumkin
  };

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
                <p>Like: {anime.likes || 0}</p> {/* Like soni */}
                <button onClick={() => handleLike(anime.id)}>Like</button>
                <button onClick={() => handleComment(anime.id)}>Comment</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
