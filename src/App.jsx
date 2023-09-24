import Logo from "./assets/chat-icon.png";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import { auth } from "./firebase/FirebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      console.log(user);
    });
  }, []);

  return (
    <>
      <div className="hidden md:flex items-center justify-between ">
        <a href="/" className="flex items-center justify-start ">
          <img src={Logo} className="logo react" alt="logo" />
          <img src="./images/chat-text.png" alt="" className="w-36 h-12" />
        </a>
        <h1 className="me-20 text-xl border-gray-600 border p-1 rounded-lg">
          Chat Lock is also a great app.
        </h1>
      </div>
      {isAuth === false ? <AuthPage /> : <ChatRoom />}
    </>
  );
}

export default App;
