import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex flex-grow items-center px-3 py-1 cursor-pointer rounded-xl ease-in bg-primary hover:bg-primaryHover"
    >
      <MdLogout className="mr-1" size={20} />
      Sign Out
    </button>
  );
}

export default Logout;
