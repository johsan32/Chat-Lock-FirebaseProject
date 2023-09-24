import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase/FirebaseConfig";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const messagesCol = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    await addDoc(messagesCol, {
      text,
      room,
      user: {
        name: auth.currentUser.displayName,
        img: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      },
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  useEffect(() => {
    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(queryOptions, (snapshot) => {
      const comingMessages = [];

      snapshot.docs.forEach((doc) =>
        comingMessages.push({ ...doc.data(), id: doc.id })
      );
      setMessages(comingMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full text-gray-800">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-2 bg-slate-600">
          <div className="flex items-center gap-2">
            <img
              src={auth?.currentUser?.photoURL}
              alt=""
              className="w-12 rounded-full"
            />
            <h3 className="text-md font-semi text-white ">
              @{auth?.currentUser?.displayName}
            </h3>
          </div>

          <p className="font-semi text-2xl text-white capitalize">~ {room} ~</p>
          <button
            onClick={() => setRoom(null)}
            className="border px-2 py-1 rounded-lg text-white bg-slate-700 hover:bg-slate-400"
          >
            Change Room
          </button>
        </div>
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {messages.map((msj) => (
            <Message key={msj.id} msj={msj} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-300 p-4 flex">
          <input
            required
            className="flex items-center h-10 w-full rounded-s-lg px-3 text-sm"
            type="text"
            value={text}
            placeholder="Type your message…"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className={`border rounded-e-lg px-3 py-1 ${
              text.length > 0 ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
