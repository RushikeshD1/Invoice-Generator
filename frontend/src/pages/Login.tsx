import { useState } from "react";
import loginlogo from "../assets/login.png";
import { Button } from "../components/ui/button";
import logo from "../assets/logopage.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Something went wrong while login", error)
    }
  }

  return (
    <div className="">
      <div className="h-full flex flex-row gap-16 align-middle py-10 w-full ">
        {/* image */}
        <div className="md:flex md:w-[35%] h-[500px] hidden ml-16">
          <img src={loginlogo} alt="login image" className="w-full h-full" />
        </div>

        {/* login form */}
        <div className="md:w-[38%] w-full p-10  flex flex-col gap-4">
          <div className="h-12">
            <img src={logo} alt="logo image" className="w-auto h-full" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Let the Journey Begin!</h1>
            <span className="text-sm text-gray-300">
              This is basic login page which is used for levitation assignment
              purpose.
            </span>
          </div>
          <form className="flex flex-col gap-4">
            <div></div>
            <div className="flex flex-col">
              <label className="text-sm">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020]"
                type="email"
                placeholder="Enter Email ID"
              />
              <span className="text-sm text-gray-400">
                This email will displayed with your inquiry
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020]"
                type="password"
                placeholder="Enter the Password"
              />
            </div>
            <div>
              <Button
                onClick={handleLogin}
                type="submit"
                className="bg-[#303030] hover:bg-[#303030] cursor-pointer text-[#bbf451]"
              >
                Login now
              </Button>
              <Button className="bg-transparent hover:underline cursor-pointer text-sm text-gray-400 font-normal">
                Forget password?
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
