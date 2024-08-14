import { forwardRef } from "react";
import type { Message } from "../../contexts/ChatProvider";
import { auth } from "../../firebase";

type MessageProps = {
  message: Message;
  isSameUser: boolean;
};

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isSameUser }, ref) => {
    // change the direction of the message (left-to-right or right-to-left) depending on if the user is the currentUser or not
    const sent: React.CSSProperties = {
      flexDirection: "row-reverse",
    };

    const isSent = message.uid === auth.currentUser?.uid;

    return (
      <>
        {isSameUser ? (
          <div
            className={`flex mb-1 px-16 pt-1 hover:bg-msgHover ${
              isSent ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`max-w-fit rounded-3xl break-words leading-6 px-4 py-2 ${
                isSent ? "bg-primary" : "bg-receivedMsg"
              }`}
            >
              {message.text}
            </p>
          </div>
        ) : (
          <div
            ref={ref}
            className="flex mb-1 gap-x-3 px-3 mt-4 hover:bg-msgHover"
            style={isSent ? sent : {}}
          >
            <div className="flex flex-col items-center justify-between truncate">
              <img
                src={message.photo}
                alt="pfp"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <small className="text-xs text-time italic pt-2">
                {message.time}
              </small>
            </div>

            <div
              className={`flex flex-col max-w-[75%] ${
                isSent ? "items-end" : "items-start"
              }`}
            >
              <span>{isSent ? "You" : message.name}</span>
              <p
                className={`max-w-fit rounded-3xl break-words leading-6 px-4 py-2 ${
                  isSent ? "bg-primary" : "bg-receivedMsg"
                }`}
              >
                {message.text}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default Message;
