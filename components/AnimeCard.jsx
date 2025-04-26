export default function AnimeCard({ anime }) {
  const handleLike = async () => {
    await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: anime.id }),
    });
    window.location.reload();
  };

  const handleComment = async () => {
    const comment = prompt("Komment yozing:");
    if (comment) {
      await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: anime.id, text: comment }),
      });
      window.location.reload();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{anime.title}</h2>
      <p>Qismlar: {anime.parts.length}</p>
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleLike}
          className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
        >
          ❤️ {anime.likes || 0}
        </button>
        <button
          onClick={handleComment}
          className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
        >
          💬 Komment
        </button>
      </div>
    </div>
  );
}
