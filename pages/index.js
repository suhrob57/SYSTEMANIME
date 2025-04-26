import { useEffect, useState } from 'react';
import { db } from '../lib/firebase'; // Firebase-dan import qilish
import { collection, getDocs, updateDoc, doc, increment, arrayUnion } from 'firebase/firestore'; // updateDoc, increment va arrayUnion import qilish

export default function Home() {
  // Animelar ro'yxatini saqlash uchun state
  const [animes, setAnimes] = useState([]);
  const [userId, setUserId] = useState(''); // Foydalanuvchi ID sini saqlash

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
    
    // Foydalanuvchi ID sini olish (har bir foydalanuvchi uchun unique bo'lishi kerak)
    // Bu yerda oddiy `localStorage` ni ishlatish mumkin (yoki autentifikatsiya qo'shish)
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      const newUserId = Date.now().toString(); // Unikal ID yaratish
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    } else {
      setUserId(storedUserId);
    }
  }, []);

  // Like funksiyasi
  const handleLike = async (animeId) => {
    // Agar foydalanuvchi allaqachon like bosgan bo'lsa, uni yana bosishga ruxsat bermaymiz
    const animeRef = doc(db, 'animes', animeId);
    const animeDoc = await getDoc(animeRef);
    const likes = animeDoc.data().likes || [];

    if (!likes.includes(userId)) {
      await updateDoc(animeRef, {
        likes: arrayUnion(userId), // Foydalanuvchi ID sini like ro'yxatiga qo'shish
      });
    }
  };

  // Comment funksiyasi
  const handleComment = async (animeId, comment) => {
    if (comment) {
      const animeRef = doc(db, 'animes', animeId);
      await updateDoc(animeRef, {
        comments: arrayUnion(comment), // Yangi komentni qo'shish
      });
    }
  };

  return (
    <div className="container">
      <header className="header">
        <a href="https://t.me/systemanimelar" target="_blank" rel="noopener noreferrer">
          <button className="telegram-btn">Telegram kanaliga o'tish</button>
        </a>
      </header>
      <h1>Anime ro'yxati</h1>
      <div>
        {animes.length === 0 ? (
          <p>Animelar yuklanmoqda...</p>
        ) : (
          <ul className="anime-list">
            {animes.map((anime) => (
              <li key={anime.id} className="anime-item">
                <h2>{anime.name}</h2>
                <p>{anime.description}</p>
                <p>Qism: {anime.parts}</p>
                <div className="like-comment-section">
                  <button onClick={() => handleLike(anime.id)}>
                    Like {anime.likes ? anime.likes.length : 0}
                  </button>
                  <textarea
                    placeholder="Comment yozing..."
                    onBlur={(e) => handleComment(anime.id, e.target.value)}
                  />
                  <div className="comments">
                    <h3>Kommentlar:</h3>
                    {anime.comments && anime.comments.length > 0 ? (
                      anime.comments.map((comment, index) => <p key={index}>{comment}</p>)
                    ) : (
                      <p>Hech qanday kommentariyalar yo'q.</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
