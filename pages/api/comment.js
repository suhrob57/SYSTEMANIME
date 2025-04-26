import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function handler(req, res) {
  const { id, text } = req.body;
  const animeRef = doc(db, "animes", id);
  await updateDoc(animeRef, {
    comments: arrayUnion(text),
  });
  res.status(200).json({ message: "Komment qo‘shildi!" });
}
