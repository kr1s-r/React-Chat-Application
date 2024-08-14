import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db, provider } from "../firebase";

interface IAuth {
  children: React.ReactNode;
}

interface IAuthContext {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  addUser: (currentUser: User | null) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: IAuth) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // login
  const login = async () => {
    return await signInWithPopup(auth, provider)
      .then((res) => console.log("signed in", res))
      .catch((err) => alert("Sign in: " + err.message));
  };

  // logout
  const logout = async () => {
    return await signOut(auth).catch((err) => alert("Signout: " + err.message));
  };

  // add user to database
  const addUser = async (currentUser: User | null) => {
    if (currentUser === null) return;

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // check if user is signed in
  useEffect(() => {
    // Set up a listener to check user authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // Display Loading State when rendering
  if (loading) {
    return (
      <div className="relative">
        <h1 className="flex justify-center items-center h-screen">
          Loading...
        </h1>
      </div>
    );
  }

  const values = {
    user,
    login,
    logout,
    addUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
