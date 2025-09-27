import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { api_base_url } from "../helper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    website: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch(api_base_url + "/api/users/getProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserData({
            name: data.user.name || "",
            email: data.user.email || "",
            location: data.user.location || "",
            bio: data.user.bio || "",
            website: data.user.website || "",
          });
        } else {
          setError(data.msg);
        }
      })
      .catch((err) => {
        setError("Error fetching profile");
      });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    fetch(api_base_url + "/api/users/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        name: userData.name,
        location: userData.location,
        bio: userData.bio,
        website: userData.website,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Profile updated successfully");
        } else {
          setError(data.msg);
        }
      })
      .catch((err) => {
        setError("Error updating profile");
      });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    fetch(api_base_url + "/api/users/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Password changed successfully");
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setError(data.msg);
        }
      })
      .catch((err) => {
        setError("Error changing password");
      });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  return (
    <>
      <Navbar />
      <div className="profile-page px-4 sm:px-6 md:px-8 lg:px-[100px] mt-6 mb-8 md:mt-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Profile</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <div className="bg-[#0c0c0c] rounded-lg p-4">
              <div className="flex flex-col gap-2">
                <button
                  className={`p-3 text-left rounded-lg transition-all ${
                    activeTab === "profile"
                      ? "bg-purple-600 text-white"
                      : "hover:bg-[#1a1a1a]"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </button>
                <button
                  className={`p-3 text-left rounded-lg transition-all ${
                    activeTab === "password"
                      ? "bg-purple-600 text-white"
                      : "hover:bg-[#1a1a1a]"
                  }`}
                  onClick={() => setActiveTab("password")}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4">
            {message && (
              <div className="bg-green-800 text-green-200 p-3 rounded-lg mb-4">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-800 text-red-200 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-[#0c0c0c] rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Profile</h3>
                <form onSubmit={handleProfileUpdate}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        className="w-full p-3 bg-[#1a1a1a] rounded-lg border border-gray-700 text-white"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        value={userData.email}
                        disabled
                        className="w-full p-3 bg-[#1a1a1a] rounded-lg border border-gray-700 text-gray-400 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed
                      </p>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={userData.location}
                        onChange={(e) =>
                          setUserData({ ...userData, location: e.target.value })
                        }
                        className="w-full p-3 bg-[#1a1a1a] rounded-lg border border-gray-700 text-white"
                        placeholder="Your location"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Bio</label>
                      <textarea
                        value={userData.bio}
                        onChange={(e) =>
                          setUserData({ ...userData, bio: e.target.value })
                        }
                        className="w-full p-3 bg-[#1a1a1a] rounded-lg border border-gray-700 text-white"
                        placeholder="Tell us about yourself"
                        rows="4"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        value={userData.website}
                        onChange={(e) =>
                          setUserData({ ...userData, website: e.target.value })
                        }
                        className="w-full p-3 bg-[#1a1a1a] rounded-lg border border-gray-700 text-white"
                        placeholder="https://example.com"
                      />
                    </div>

                    <button type="submit" className="btnNormal mt-4">
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "password" && (
              <div className="bg-[#0c0c0c] rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full p-3 bg-[#1a1a1a] rounded-lg border border-gray-700 text-white pr-10"
                          placeholder="Enter current password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => togglePasswordVisibility("current")}
                        >
                          {showPassword.current ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full p-3 bg-[#1a1a1a] rounded-lg border border-gray-700 text-white pr-10"
                          placeholder="Enter new password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => togglePasswordVisibility("new")}
                        >
                          {showPassword.new ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full p-3 bg-[#1a1a1a] rounded-lg border border-gray-700 text-white pr-10"
                          placeholder="Confirm new password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => togglePasswordVisibility("confirm")}
                        >
                          {showPassword.confirm ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="btnNormal mt-4">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
