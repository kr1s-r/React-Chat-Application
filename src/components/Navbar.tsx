import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import Logout from "./Logout";

function Navbar() {
  const { user } = useAuth();
  const { currentRoom } = useChat();

  return (
    <nav className="mx-auto my-0 border-b-[1px] border-[rgba(255,255,255,0.2)]">
      <header className="sticky top-0 min-h-[50px] px-3 flex items-center justify-between bg-nav w-full z-99">
        <p className="text-xl">
          Chat Room: {user && currentRoom ? currentRoom.name : ""}
        </p>

        <div className="flex gap-x-3">
          {user && <Logout />}
          {user && (
            <img
              src={user.photoURL as string}
              alt="user pfp"
              className="w-11 h-11 rounded-full cursor-pointer border border-white hover:border-slate-300 transition-all hover:opacity-85"
            />
          )}
        </div>
      </header>
    </nav>
  );
}

export default Navbar;
