import { useState, type FormEvent } from "react";
import loginlogo from "../assets/login.png";
import { Button } from "../components/ui/button";
import logo from "../assets/logopage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/slices/authSlice";
import type { RootState } from "../redux/store.ts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error: reduxError } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    setLocalError(null);

    if (!email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    try {
      dispatch(loginStart());
      const res = await axios.post(
        "https://invoice-generator-3-0a0g.onrender.com/api/v1/user/login",
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        dispatch(loginSuccess({ token: res.data.user.token, user: res.data.user }));
        navigate("/");
      } else {
        const backendMessage = res.data.message || "Login failed.";
        dispatch(loginFailure(backendMessage));
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong while logging in.";
      dispatch(loginFailure(errorMessage));
      console.error(errorMessage, error);
    }
  };

  return (
    <div className="">
      <div className="h-full flex flex-row gap-16 align-middle py-10 w-full ">
        {/* image */}
        <div className="md:flex md:w-[35%] h-[500px] hidden ml-16">
          <img src={loginlogo} alt="login image" className="w-full h-full" />
        </div>

        {/* login form */}
        <div className="md:w-[38%] w-full p-10 flex flex-col gap-4">
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
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                This email will be displayed with your inquiry
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
                type="submit"
                disabled={isLoading}
                className="bg-[#303030] hover:bg-[#303030] cursor-pointer text-[#bbf451]"
              >
                {isLoading ? 'Logging in...' : 'Login now'}
              </Button>
              <Button type="button" className="bg-transparent hover:underline cursor-pointer text-sm text-gray-400 font-normal">
                Forget password?
              </Button>
            </div>
          </form>
          {localError && <div className="text-red-500 mt-2">{localError}</div>}
          {reduxError && <div className="text-red-500 mt-2">{reduxError}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;