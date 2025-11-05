import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "@/components/SuccessMessage";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import nivraLogo from "@/assets/nivra-logo.png";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (): void => {
    // TODO: Add backend API call here
    console.log("Login data:", formData);
    setIsSuccess(true);
  };

  const handleChange = (
    field: keyof LoginFormData,
    value: string | boolean
  ): void => {
    setFormData({ ...formData, [field]: value });
  };

  if (isSuccess) {
    return (
      <SuccessMessage
        message="You have successfully Logged into Nivra Gaming Site"
        onClose={() => navigate("/game")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2 md:p-4 ">
      <Card className="w-full max-w-[500px] bg-[#050505cc] border-transparent md:border-4 md:border-[#D932FE] px-2 lg:px-6">
        <CardContent className="py-2 px-1  sm:px-3 border-none ">
          <div className="flex justify-center mb-1 sm:mb-2">
            <div className="border-4 md:border-pink-500 border-transparent rounded-2xl p-3 sm:p-4 w-32 sm:w-48">
              <img src={nivraLogo} alt="Nivra Logo" className="w-full h-auto" />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <div>
              <Label
                htmlFor="login-email"
                className="text-white text-sm mb-1 block "
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Email
              </Label>
              <Input
                id="login-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-[#411366] hover:bg-[#411366] hover:border-transparent transition-[background-color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border-0 text-white rounded-lg h-12"
              />
            </div>

            <div>
              <Label
                htmlFor="login-password"
                className="text-white text-sm mb-1 block "
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full bg-[#411366] hover:bg-[#411366] hover:border-transparent transition-[background-color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border-0 text-white rounded-lg h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col  sm:flex-row items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    handleChange("rememberMe", checked as boolean)
                  }
                  className="border-white data-[state=checked]:bg-pink-500"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-white text-sm cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                onClick={() => navigate("/auth/sign-up")}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Don't have an account?
              </button>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                className="w-[126px] h-[48px] bg-[#FF00B2] hover:bg-[#d900a0] text-white  font-semibold  transition rounded-none cursor-pointer"
              >
                Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
