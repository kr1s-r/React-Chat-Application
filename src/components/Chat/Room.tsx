import moment from "moment";
import type { Room } from "../../contexts/ChatProvider";
import { formatRoom } from "../../utils/utils";
import { useChat } from "../../hooks/useChat";
import useMessages from "../../hooks/useMessages";

type RoomProps = { room: Room };

function Room({ room }: RoomProps) {
  const { setChat } = useChat();
  const messages = useMessages(room.id ?? ""); // get all messages in this room
  const lastMessage = messages[messages.length - 1];
  const { text, timestamp } = formatRoom(lastMessage || {});

  const handleRoom = () => {
    setChat(room?.id as string, room.name ?? "");
  };

  return (
    <div
      onClick={handleRoom}
      className="w-full p-4 hover:bg-primaryHover border-b-[1px] border-primary cursor-pointer transition-all ease-in-out"
    >
      <p className="font-semibold">{room.name}</p>
      <div className="flex items-center justify-between mt-4 gap-x-4">
        <p className="block truncate">{text ? text : "..."}</p>
        <p className="block text-xs truncate">
          {timestamp ? moment(timestamp?.toDate()).fromNow() : "..."}
        </p>
      </div>
    </div>
  );
}

export default Room;
