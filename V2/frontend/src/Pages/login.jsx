import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../Components/Auth/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Components/Auth/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { GoogleIcon } from "../Components/Auth/GoogleIcon";
import "../Components/Auth/lock.css";
import { LoginBackground } from "../Asset/loginBackground";
import { Link } from "@nextui-org/react";
// import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  // const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`,
      "_self"
    );
  };

  const startAnimations = () => {
    setIsAnimating(true);
  };

  // const onAnimationEnd = () => {
  //   setTimeout(() => {
  //     navigate("/home");
  //   }, 100);
  // };

  return (
    <div className="fixed top-0 left-0 w-3/5 h-full">
      <div className="fixed top-60 left-5 flex-wrap justify-center col-span-full">
        <h1 style={{ fontSize: "5.25rem", color: "white" }}>RMS</h1>
        <h1 style={{ fontSize: "2.75rem", color: "white" }}>
          Empower Your Resources:
        </h1>
        <h1 style={{ fontSize: "2.75rem", color: "white" }}>
          Streamline & Optimize
        </h1>
      </div>
      <LoginBackground />
      <div className="fixed bottom-0 left-0">
        <footer style={{ fontSize: "1.00rem", color: "white" }}>
          Searce© Contact About Us
        </footer>
      </div>
      <div
        // onAnimationEnd={onAnimationEnd}
        className="login-div fixed top-0 right-24 flex justify-center items-center h-screen"
        style={{ paddingTop: "6.25rem" }}
      >
        <div className={`lock-circle ${isAnimating ? "animate" : ""}`}>
          <div className="lock-circle-inside"></div>
          <div className={`lock-box ${isAnimating ? "animate" : ""}`}></div>
        </div>
        <div
          style={{ borderColor: "rgba(21,47,193,255)" }}
          className="border-2 rounded-xl p-4 w-[21.875rem] bg-white"
        >
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
            <Button color="primary" variant="ghost" onClick={startAnimations}>
              Login
            </Button>
            <Link href="https://support.google.com/" underline="hover">
              Forgot Password?
            </Link>
            <Divider className="my-1" />
            <Button
              color="primary"
              variant="bordered"
              onClick={() => {
                googleAuth();
                startAnimations();
              }}
            >
              <GoogleIcon />
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
