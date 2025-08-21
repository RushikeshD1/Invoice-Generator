import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="h-16 bg-[#1F1F1F] flex flex-row justify-between align-middle items-center px-20 sticky top-0 z-50">
      <Link to={"/"} className="flex flex-row gap-2 cursor-pointer">
        {/* Logo */}
        <div>
            <img src={logo} alt="Levitation" />
        </div>

        <div className="flex flex-col align-middle">
          <h1 className="font-light text-lg">levitation</h1>
          <span className="text-sm -mt-1 text-gray-400">infotech</span>
        </div>
      </Link>

      <div className="flex flex-row gap-2 text-black">
        {isAuthenticated ? (
          <Button onClick={handleLogout} className="bg-[#bbf451] text-black hover:bg-[#a5d847] cursor-pointer">
            Logout
          </Button>
        ) : (
          <>
            <Button onClick={() => navigate("/login")} className="bg-[#bbf451] text-black hover:bg-[#a5d847] cursor-pointer">
              Login
            </Button>
            <Button onClick={() => navigate("/signup")} className="bg-[#bbf451] text-black hover:bg-[#a5d847] cursor-pointer">
              Signup
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
