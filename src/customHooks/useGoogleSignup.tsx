import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image"; // Ensure you import Next.js Image
import google from "../../public/assets/google.png"; 
import Toast from "@/components/auth/Toast";
import {toast} from 'react-toastify';
import axios from "axios";
const GoogleSignIn = () => {
    const handleGoogleSignup = async (response: any) => {
        try {
          const { credential: idToken } = response; // Extract the Google ID token
          console.log("ID Token:", idToken);
    
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google/signup`, // Signup endpoint
            { idToken }
          );
    
          if (res.status === 201) {
         
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userData", JSON.stringify(res.data.user));
            toast.success("Account created successfully! Redirecting...");
    
            // Redirect to the dashboard
            setTimeout(() => {
              window.location.href = "/main/dashboard";
            }, 1000);
          }
        } catch (error: any) {
          console.error("Error during Google Signup:", error);
    
          if (error.response?.status === 409) {
            toast.error("Signup failed: User already exists. Please log in.");
          } else {
            toast.error("Signup failed. Please try again.");
          }
        }
      };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login Success:", tokenResponse);
      handleGoogleSignup(tokenResponse);
    },
    onError: () => console.log("Google login failed"),
  });

  return (
    <>
    <Toast/>
    <div className="">
      <button
        type="button"
        onClick={() => login()} 
        className="w-[430px] flex items-center justify-center pt-3 pb-2.5 border-[1.5px] border-[#565dBD] rounded-lg hover:bg-gray-50 font-medium mt-[9px]"
      >
        <Image
          src={google}
          alt="Google"
          width={26}
          height={26}
          className="mr-7"
        />
        <span className="text-[15px] text-[#565dbd] -translate-x-3">
          Continue with Google
        </span>
      </button>
    </div>
    </>
  );
};

export default GoogleSignIn;
