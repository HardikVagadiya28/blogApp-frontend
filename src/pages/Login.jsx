import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/api/auth/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          setTimeout(() => {
            window.location.href = "/";
          }, 200);
        } else {
          setError(data.msg);
        }
      });
  };

  return (
    <>
      <div className="con flex flex-col items-center justify-center h-screen bg-[#070707] px-4">
        <form
          onSubmit={submitForm}
          className="w-full sm:w-[80%] md:w-[60%] lg:w-[26vw] min-h-[auto] bg-[#0f0e0e] rounded-2xl p-4 md:p-5 flex flex-col items-center border border-purple-600"
        >
          <img
            className="-mt-3 w-[240px] h-[100px] object-cover"
            src="/images/logo.png"
            alt="BlogApp Logo"
          />
          <div className="w-full">
            <p className="text-[gray] text-[14px] mt-3">Email</p>
            <div className="inputBox">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <p className="text-[gray] text-[14px] mt-3">Password</p>
            <div className="inputBox relative">
              <input
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            <p className="text-[14px] text-[gray] mt-3">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-purple-600">
                Sign Up
              </Link>
            </p>

            <p className="text-[14px] text-red-500 mt-1 mb-3">{error}</p>
            <button className="btnNormal w-full border border-purple-600 hover:border-purple-800">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
