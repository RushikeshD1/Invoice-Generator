import { Button } from "../components/ui/button"
import signuplogo from "../assets/signup.png"
import { useState } from "react"
import axios from "axios"

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegistration = async () => {
        try {
            setName("")
            setEmail("")
            setPassword("")
        } catch (error) {
            console.log("while registration something went wrong", error);
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
            <form className="flex flex-col gap-4">

                <div className="flex flex-col">
                    <label className="text-sm">Enter your name</label>
                    <input onChange={(e)=> setName(e.target.value)} value={name} className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020]" type="text" placeholder="Enter name" />
                    <span className="text-sm text-gray-400" >This name will displayed with your inquiry</span>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Email Address</label>
                    <input onChange={(e)=> setEmail(e.target.value)} value={email} className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020]" type="email" placeholder="Enter Email ID" />
                    <span className="text-sm text-gray-400">This email will displayed with your inquiry</span>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm">Password</label>
                    <input onChange={(e)=> setPassword(e.target.value)} value={password} className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020]" type="password" placeholder="Enter the Password" />
                    <span className="text-sm text-gray-400">Any furthur updates will be forwarded on this email ID</span>
                </div>
                <div>
                    <Button onClick={handleRegistration} type="submit" className="bg-[#303030] hover:bg-[#303030] cursor-pointer text-[#bbf451]">Register</Button>
                    <Button className="bg-transparent hover:underline cursor-pointer text-sm text-gray-400">Already has an account</Button>
                </div>
            </form>
        </div>

        {/* Image */}
        <div className="md:w-[64%] md:flex hidden flex-col justify-center align-middle items-center mt-10 ">
            <img src={signuplogo} alt="signup logo" className="w-full h-[550px]" />
        </div>
    </div>
  )
}

export default SignUp