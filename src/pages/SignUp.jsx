import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/api/auth/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/login");
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
            src={logo}
            alt=""
          />
          <div className="w-full">
            <p className="text-[gray] text-[14px] mt-3">Username</p>
            <div className="inputBox">
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                type="text"
                placeholder="Username"
                required
              />
            </div>

            <p className="text-[gray] text-[14px] mt-3">Name</p>
            <div className="inputBox">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Name"
                required
              />
            </div>

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
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600">
                Login
              </Link>
            </p>

            <p className="text-[14px] text-red-500 mt-1 mb-3">{error}</p>
            <button className="btnNormal w-full border border-purple-600 hover:border-purple-800">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
