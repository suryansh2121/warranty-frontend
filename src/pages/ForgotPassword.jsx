import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { div } from "framer-motion/client";


function ForgotPassword(){
    const [email, setEmail] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await api.post("/api/auth/forgot-password", {email});
            toast.success("Reset Link Sent to your email");
            setEmail("");
        }catch(err){
            toast.error(err.response?.data?.message || "Failed to sent reset Link");
        }
    };
    return(
        <div className=" flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/10 p-8 rounded-xl shadow-xl backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <p>Enter your registered email</p>
            <input type="email"
            required 
            placeholder= "Your Email"
            className="w-full p-3 rounded-lg bg-white/20 text-white mb-4 placeholder-white/50"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-lg transition">
            Send Reset Link
          </button>
            </form>
            
        </div>
    )

}

export default ForgotPassword;
