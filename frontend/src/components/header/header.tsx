import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png"

const Header = () => {

  const navigation = useNavigate()

  const navigateToLogin = () => {
    navigation("/login");
  }

  const navigateToSignUp = () => {
    navigation("/signup");
  }

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
        <Button onClick={navigateToLogin} className="bg-[#bbf451] text-black hover:bg-[#a5d847] cursor-pointer">
          Login
        </Button>
        <Button onClick={navigateToSignUp} className="bg-[#bbf451] text-black hover:bg-[#a5d847] cursor-pointer">
          Signup
        </Button>
        <Button onClick={navigateToSignUp} className="bg-[#bbf451] text-black hover:bg-[#a5d847] cursor-pointer">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
