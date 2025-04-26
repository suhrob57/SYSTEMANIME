import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function handler(req, res) {
  const { id } = req.body;
  const animeRef = doc(db, "animes", id);
  await updateDoc(animeRef, {
    likes: increment(1),
  });
  res.status(200).json({ message: "Like qo‘shildi!" });
}
