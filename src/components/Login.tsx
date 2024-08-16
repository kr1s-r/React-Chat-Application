import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../firebase";

function Login() {
  const { login, addUser } = useAuth();
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    await login();
    if (auth.currentUser) await addUser(auth.currentUser);
    navigate("/chat");
  };

  return (
    <button
      onClick={handleSignInWithGoogle}
      className="flex items-center px-3 py-2 gap-x-3 cursor-pointer rounded-xl ease-in bg-primary hover:bg-primaryHover"
    >
      <img src="iconGoogle.svg" alt="google img" />
      <span className="text-xl">Login with Google</span>
      <p>Do not violate the community guidelines</p>
    </button>
  );
}

export default Login;
