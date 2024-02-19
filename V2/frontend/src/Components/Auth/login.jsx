import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { GoogleIcon } from "./GoogleIcon";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className="fixed top-0 left-0 w-3/5 h-full bg-gray-900">
      <div className="fixed top-0 right-24 flex justify-center items-center h-screen">
        <div className="border-2 border-gray-300 rounded-xl p-4 w-[350px]">
          <div className="flex flex-col gap-5">
            <Input
              isRequired
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <Input
              isRequired
              label="Password"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            <Button color="primary" variant="ghost">
              Login
            </Button>
            <p>Forgot Password?</p>
            <Divider className="my-1" />
            <Button color="primary" variant="bordered" onClick={googleAuth}>
              <GoogleIcon />
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
