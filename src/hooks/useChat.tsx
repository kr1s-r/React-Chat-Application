import { useContext } from "react";
import { ChatContext } from "../contexts/ChatProvider";

export function useChat() {
  return useContext(ChatContext);
}
