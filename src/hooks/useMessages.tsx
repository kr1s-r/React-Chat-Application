/* custom hook to gather certain messages based on the room id */
// 1. can be used to get all the messages in a room
// 2. can be used to get specific messages in a room

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import type { Message } from "../contexts/ChatProvider";
import { db } from "../firebase";

function useMessages(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // if id doesn't exist
    if (!roomId) return;

    // get collection
    const messagesRef = collection(doc(db, "rooms", roomId), "messages");

    // query through database to sort by oldest to newest
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(data);
    });

    // clean up function
    return () => unsubscribe();
  }, [roomId]); // dependencies of the current room's id

  return messages;
}

export default useMessages;
