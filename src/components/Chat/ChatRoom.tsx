import { useEffect, useRef, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { FiSend } from "react-icons/fi";
import { auth } from "../../firebase";
import { useChat } from "../../hooks/useChat";
import { calculateTimeDifference, formatTime } from "../../utils/utils";
import Message from "./Message";

function ChatRoom() {
  const [text, setText] = useState<string>("");
  const dummy = useRef<HTMLDivElement>(null);
  const { sendMessage, messages } = useChat();

  const handleMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get current time
    const current = new Date(Date.now());
    const time = `${formatTime(current.getHours())}:${formatTime(
      current.getMinutes()
    )}`;
    // const date = current.toDateString(); // current date

    if (auth.currentUser) {
      await sendMessage(auth.currentUser, text, time);
    }

    setText("");
  };

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Dependency array ensures scrolling happens after messages update

  return (
    <>
      {/* 100vh - 50px (size of navbar) - 1px (border bottom) */}
      <div className="flex flex-col flex-[0.80] h-[calc(100vh-51px)] w-full ">
        {/* height is 100vh - 50px - 61px */}
        {/* The navbar is 50px and the form below is 61px */}
        <main className="flex flex-col overflow-y-scroll h-[calc(100vh-111px)] pt-2 pr-1">
          {messages.length > 0 &&
            messages.map((message, index) => {
              // checks if the current message and the previous message sent were sent by the same user
              // also checks if there is a time difference of more than 1 minute
              const isSameUser =
                index > 0 &&
                messages[index - 1].uid === message.uid &&
                calculateTimeDifference(
                  message?.createdAt ?? Timestamp.now(),
                  messages[index - 1].createdAt ?? Timestamp.now(),
                  1
                );

              return (
                <Message
                  key={message.id}
                  message={message}
                  isSameUser={isSameUser}
                />
              );
            })}
          <span ref={dummy}></span>
        </main>
        <form className="flex mx-2 gap-x-2 my-1" onSubmit={handleMessage}>
          <input
            type="text"
            id="chat-input"
            className="bg-chatInput w-full rounded-2xl outline-none px-3"
            placeholder="type here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
            autoFocus
          />
          <button
            type="submit"
            id="button-input"
            className={`max-w-[125px] grid place-content-center rounded-2xl cursor-pointer bg-primary px-10 py-3 disabled:opacity-50 ${
              text && "hover:bg-primaryHover"
            }`}
            disabled={!text}
          >
            <FiSend className="rotate-[-90deg]" size={25} />
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatRoom;
