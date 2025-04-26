import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function handler(req, res) {
  const snapshot = await getDocs(collection(db, "animes"));
  const animes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.status(200).json(animes);
}
