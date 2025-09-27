import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
    handleClose();
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="navbar flex items-center justify-between h-[60px] xs:h-[70px] sm:h-[80px] md:h-[100px] px-3 xs:px-4 sm:px-6 md:px-8 lg:px-[100px] bg-[#0c0c0c] overflow-hidden">
        <div className="logo">
          <img
            className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
            src="/images/logo.png"
            alt="BlogApp Logo"
          />
        </div>

        <div className="hidden md:flex items-center gap-[15px] lg:gap-[20px]">
          <Link to="/" className="navLink">
            Home
          </Link>
          <Link to="/about" className="navLink">
            About
          </Link>
          <Link to="/blogs" className="navLink">
            Blogs
          </Link>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <AccountCircleIcon
                sx={{ color: "white", fontSize: { xs: 28, sm: 32 } }}
              />
            </IconButton>
          </Tooltip>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <IconButton
            onClick={toggleMobileMenu}
            size="large"
            sx={{ color: "white" }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                bgcolor: "#1a1a1a",
                color: "white",
                "& .MuiMenuItem-root": {
                  color: "white",
                  "&:hover": {
                    bgcolor: "#9333ea",
                  },
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "#1a1a1a",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/profile");
            }}
          >
            <ListItemIcon>
              <Person fontSize="small" sx={{ color: "white" }} />
            </ListItemIcon>
            Profile
          </MenuItem>
          <Divider sx={{ bgcolor: "#333" }} />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: "white" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#0c0c0c] z-50 transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <img className="w-[120px]" src="/images/logo.png" alt="BlogApp Logo" />
            <IconButton
              onClick={toggleMobileMenu}
              size="large"
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex flex-col space-y-0 p-4">
            <button
              onClick={() => handleMobileNavClick("/")}
              className="navLink text-left py-4 px-2 border-b border-gray-800"
            >
              Home
            </button>
            <button
              onClick={() => handleMobileNavClick("/about")}
              className="navLink text-left py-4 px-2 border-b border-gray-800"
            >
              About
            </button>
            <button
              onClick={() => handleMobileNavClick("/blogs")}
              className="navLink text-left py-4 px-2 border-b border-gray-800"
            >
              Blogs
            </button>
            <button
              onClick={() => handleMobileNavClick("/profile")}
              className="navLink text-left py-4 px-2 border-b border-gray-800"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="navLink text-left py-4 px-2 text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
