import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import nivraLogo from "@/assets/nivra-logo.png";
import SuccessMessage from "@/components/SuccessMessage";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (): void => {
    // TODO: Add backend API call here
    console.log("Sign up data:", formData);
    setIsSuccess(true);
  };

  const handleChange = (field: keyof SignUpFormData, value: string): void => {
    setFormData({ ...formData, [field]: value });
  };

  if (isSuccess) {
    return (
      <SuccessMessage
        message={
          <>
            You have successfully logged into <br />
            <span className="text-[#FF00B2] font-semibold">
              Nivra Gaming Site
            </span>
          </>
        }
        onClose={() => navigate("/die-roller")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2 md:p-4 ">
      <Card className="w-full max-w-[500px] bg-[#050505cc] border-transparent lg:border-4 md:border-[#D932FE] px-2 lg:px-6">
        <CardContent className="py-2 px-1  sm:px-3 border-none ">
          {/* Logo */}
          <div className="flex justify-center mb-1 sm:mb-2">
            <div className="border-4 border-pink-500 rounded-2xl p-3 sm:p-4 w-32 sm:w-48">
              <img src={nivraLogo} alt="Nivra Logo" className="w-full h-auto" />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <div>
              <Label
                htmlFor="username"
                className="text-white text-sm mb-1 block "
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                User Name
              </Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className="w-full bg-[#411366] hover:bg-[#411366] hover:border-transparent transition-[background-color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border-0 text-white rounded-sm h-10 sm:h-12"
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-white text-sm mb-1 block"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-[#411366] hover:bg-[#411366] hover:border-transparent transition-[background-color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border-0 text-white rounded-sm h-10 sm:h-12"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-white text-sm mb-1 block"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full bg-[#411366] hover:bg-[#411366] hover:border-transparent transition-[background-color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border-0 text-white rounded-sm h-10 sm:h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-white text-sm mb-1 block"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  className="w-full bg-[#411366] hover:bg-[#411366] hover:border-transparent transition-[background-color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border-0 text-white rounded-sm h-10 sm:h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="text-white text-sm hover:text-[#d900a0] mb-2 "
              >
                Login
              </button>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                className="w-[126px] h-[48px] bg-[#FF00B2] hover:bg-[#d900a0] text-white  font-semibold  transition rounded-none"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default SignUp;
