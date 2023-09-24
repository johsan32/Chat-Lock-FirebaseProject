import  { useState } from "react";
import ChatPage from "../pages/ChatPage";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase/FirebaseConfig";

const ChatRoom = () => {
  const [room, setRoom] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    setRoom(e.target[0].value);
  };
const handleOut = (auth) =>{
  signOut(auth)
  .then(() => {
  })
  .catch((error) => {
    console.log(error);
  });

}

  return (
    <div className=" max-w-xl flex items-center justify-center h-screen md:h-[85vh] m-auto">
      {room ? (
        <ChatPage room={room} setRoom={setRoom}/>
      ) : (
        <div className=" w-full mx-5 border p-5 rounded-lg bg-slate-800">
          <div className="flex items-center justify-center gap-3">
            <img src="./images/chat-icon.png" className=" w-16" alt="" />
            <p className=" text-white text-2xl font-bold">
              Login into chat room
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit} className="px-10">
              <div className="mt-2 ">
                <label className="text-white text-base font-normal">
                  Chat Room Name
                </label>
                <div className="flex my-3 py-2 items-center justify-between bg-zinc-100 rounded-lg  ">
                  <input
                    required
                    type="text"
                    placeholder="e.g.: party"
                    className="w-full text-neutral-600 placeholder:text-neutral-600 px-4 bg-transparent outline-none"
                  />
                </div>
              </div>to chat
              <div className="mt-6 "></div>

              <button
                className="w-full py-3 mt-9 text-white bg-[#25D366] hover:bg-green-500 focus:ring-4 text-xl focus:outline-none focus:ring-[#3b5998]/50  rounded-lg  text-center dark:focus:ring-[#3b5998]/55 "
                type="submit"
              >
                Login now
              </button>

              <div className="relative flex items-center mt-8">
                <div className="border h-0 w-2/4 border-stone-300"></div>
                <div className=" text-stone-300 px-4 text-sm font-normal">
                  OR
                </div>
                <div className=" border h-0 w-2/4 border-stone-300"></div>
              </div>
              <button 
              onClick={() =>handleOut(auth)}
              className="border-none outline-none rounded-lg  text-center  text-white bg-red-500 text-xl  w-full py-3 mt-9 shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none ">
                Signup now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
