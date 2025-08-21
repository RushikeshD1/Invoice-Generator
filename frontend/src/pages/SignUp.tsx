import { Button } from "../components/ui/button"
import signuplogo from "../assets/signup.png"
import { useState, type FormEvent } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store.ts";
import { loginStart, loginSuccess, loginFailure } from "../redux/slices/authSlice.ts";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error: reduxError } = useSelector((state: RootState) => state.auth);

    const handleRegistration = async (event: FormEvent) => {
        event.preventDefault();

        setLocalError(null);

        if (!name || !email || !password) {
            setLocalError("Please fill in all fields.");
            return;
        }

        try {
            dispatch(loginStart());
            const res = await axios.post("https://invoice-generator-3-0a0g.onrender.com/api/v1/user/register", {
                email,
                name,
                password
            });

            if(res.data.success){
                dispatch(loginSuccess({ token: res.data.user.token, user: res.data.user }));
                navigate("/");
            } else {
                const backendMessage = res.data.message || "Registration failed.";
                dispatch(loginFailure(backendMessage));
            }

            setName("");
            setEmail("");
            setPassword("");

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong during registration.";
            dispatch(loginFailure(errorMessage));
            console.error("while registration something went wrong", error);
        }
    }

  return (
    <div className=" flex justify-between align-middle min-h-screen flex-row text-white gap-10">
        {/* Info */}
        <div className="md:w-[30%] flex gap-4 flex-col md:ml-20 w-[100%] md:py-22 p-5">
            <div>
                <h1 className="text-2xl font-semibold">Sign up to begin journey</h1>
                <span className="text-sm text-gray-300">This is basic signup page which is used for levitation assignment purpose.</span>
            </div>
            <form onSubmit={handleRegistration} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label className="text-sm">Enter your name</label>
                    <input onChange={(e)=> setName(e.target.value)} value={name} className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020]" type="text" placeholder="Enter name" />
                    <span className="text-sm text-gray-400" >This name will be displayed with your inquiry</span>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Email Address</label>
                    <input onChange={(e)=> setEmail(e.target.value)} value={email} className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020]" type="email" placeholder="Enter Email ID" />
                    <span className="text-sm text-gray-400">This email will be displayed with your inquiry</span>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Password</label>
                    <input onChange={(e)=> setPassword(e.target.value)} value={password} className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020]" type="password" placeholder="Enter the Password" />
                    <span className="text-sm text-gray-400">Any further updates will be forwarded on this email ID</span>
                </div>
                <div>
                    <Button type="submit" disabled={isLoading} className="bg-[#303030] hover:bg-[#303030] cursor-pointer text-[#bbf451]">
                        {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                    <Button onClick={() => navigate("/login")} type="button" className="bg-transparent hover:underline cursor-pointer text-sm text-gray-400">Already has an account</Button>
                </div>
            </form>
            {(localError || reduxError) && <div className="text-red-500 mt-2">{localError || reduxError}</div>}
        </div>

        {/* Image */}
        <div className="md:w-[64%] md:flex hidden flex-col justify-center align-middle items-center mt-10 ">
            <img src={signuplogo} alt="signup logo" className="w-full h-[550px]" />
        </div>
    </div>
  )
}

export default SignUp