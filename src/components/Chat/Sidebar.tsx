// import { IoMdCreate } from "react-icons/io";
import { useChat } from "../../hooks/useChat";
import Room from "./Room";

function Sidebar() {
  const { rooms } = useChat();

  /* ADD ROOM FUNCTIONALITY */
  // const { addRoom } = useChat();
  // const handleAddRoom = async () => {
  //   const roomName = prompt("enter name...");
  //   if (roomName === null) return alert("Enter valid name");
  //   await addRoom(roomName);
  // };

  return (
    <>
      {/* 100vh - 50px (size of navbar) - 1px (border bottom) */}
      <div className="flex flex-col min-w-[150px] flex-[0.20] border-r-2 border-[rgba(255,255,255,0.2)] h-[calc(100vh-51px)]">
        <div className="flex justify-center items-center py-2 text-lg">
          Rooms
          {/* <IoMdCreate onClick={handleAddRoom} /> */}
        </div>
        <div className="overflow-y-scroll sidebar__rooms">
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
