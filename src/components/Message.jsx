import { Timestamp } from "firebase/firestore";
import { auth } from "../firebase/FirebaseConfig";

function calculateTimeDifference(createdAt) {
  if (!(createdAt instanceof Timestamp)) {
    return "Geçersiz zaman";
  }

  const now = Timestamp.now();
  const differenceInSeconds = now.seconds - createdAt.seconds;
  const minutes = Math.floor(differenceInSeconds / 60);

  if (minutes === 0) {
    return "Now";
  } else if (minutes === 1) {
    return "1 munite ago";
  } else {
    return `${minutes} munite ago`;
  }
}

const Message = ({ msj }) => {
  const timeDifference = calculateTimeDifference(msj.createdAt);

  if (msj.user.uid !== auth.currentUser.uid) {
    return (
      <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <img
          src={msj?.user?.img}
          className="flex-shrink-0 h-10 w-10 rounded-full"
        />
        <div>
          <div className="bg-blue-600 p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm text-white">{msj?.text}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">
            {msj?.user.name}
          </span>
          <span className="text-slate-700"> | </span>
          <span className="text-xs text-gray-500 leading-none">
            {timeDifference}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div className="bg-gray-300 text-black p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm"> {msj?.text}.</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          {timeDifference}
        </span>
      </div>
      <div className="flex-shrink-0 h-10 w-10 rounded-full">
        <img
          src={auth?.currentUser?.photoURL}
          className="flex-shrink-0 h-10 w-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Message;
