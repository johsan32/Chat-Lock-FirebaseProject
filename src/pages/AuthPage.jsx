import { auth, provider } from "./../firebase/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";

const AuthPage = () => {
  const handleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Oturum açma başarılı, result içinde kullanıcı bilgileri bulunabilir.
      console.log("Oturum açma başarılı:", result.user);
    } catch (error) {
      // Oturum açma sırasında hata oluştu
      console.error("Oturum açma hatası:", error);
    }
  };
  return (
    <div className=" grid place-items-center m-auto h-[80vh] items-center justify-center flex-col ">
      <div className="w-[70vw]  md:w-[32vw] h-[60vh] md:mt-0 mt-32 overflow-hidden grid place-items-center border  p-4 gap-5 rounded-lg">
        <img
          src="./images/chat-lock.png"
          alt=""
          className="w-[150px] h-[150px] rounded-lg flex content-center m-auto"
        />
        <h1 className="  text-center text-xl">
          Sign in or create an account
        </h1>
        <button
          onClick={handleClick}
          className=" flex justify-center items-center gap-2 border hover:bg-gray-500 mx-9 rounded-md px-3 py-1"
        >
          {" "}
          <img src="./images/google.png" alt="" className="w-10" />
          <span className="">Contiune With Google</span>
        </button>
        <span className="text-[10px] border-b border-gray-700 cursor-pointer hover:text-red-500 ">
          By continuing, you agree to our Terms Of Use and Privacy Policy.
        </span>
      </div>
    </div>
  );
};

export default AuthPage;
