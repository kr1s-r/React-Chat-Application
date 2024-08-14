import { createContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "../firebase";
import useMessages from "../hooks/useMessages";

export type Message = {
  id?: string;
  uid?: string;
  name?: string;
  text?: string;
  photo?: string;
  time?: string;
  roomId?: string;
  roomName?: string;
  createdAt?: Timestamp;
};

export type Room = {
  id?: string;
  name?: string;
  createdAt?: string;
};

interface IChat {
  children: React.ReactNode;
}

interface IChatContext {
  rooms: Room[];
  messages: Message[];
  currentRoom: Room;
  sendMessage: (currentUser: User, text: string, time: string) => Promise<void>;
  setChat: (id: string, name: string) => void;
  addRoom: (roomName: string) => Promise<void>;
}

export const ChatContext = createContext({} as IChatContext);

function ChatProvider({ children }: IChat) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room>({ id: "", name: "" });
  // fetch all the messages for the current room from db
  const messages = useMessages(currentRoom.id ?? "");

  // send message to db
  const sendMessage = async (currentUser: User, text: string, time: string) => {
    try {
      const messagesRef = collection(
        doc(db, "rooms", currentRoom.id ?? ""),
        "messages"
      );

      await addDoc(messagesRef, {
        uid: currentUser.uid,
        name: currentUser.displayName,
        photo: currentUser.photoURL,
        text: text,
        time: time,
        roomId: currentRoom.id,
        roomName: currentRoom.name,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // assign the current room
  const setChat = (id: string, name: string) => {
    if (id === null || name === null) return;
    setCurrentRoom({ id: id, name: name });
  };

  /* add room to db (keep fixed for now) */
  const addRoom = async (roomName: string) => {
    try {
      await addDoc(collection(db, "rooms"), {
        name: roomName,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // fetch rooms from database
  useEffect(() => {
    const q = query(collection(db, "rooms"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (docSnapshot) => {
      const data = docSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setRooms(data);
    });

    // clean up function
    return () => unsubscribe();
  }, []);

  const values = {
    rooms,
    messages,
    currentRoom,
    sendMessage,
    setChat,
    addRoom,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}

export default ChatProvider;
