import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "@/utils/organizationSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    // Dispatch the addUser action with sample data
    // Replace it with actual data as needed
    console.log("logout");
    dispatch(
      removeUser({
        organization: null,
        isOrganizationLoggedIn: false,
        tokens: null,
      })
    );
    navigate("/login");
  };
  return (
    <header className="fixed top-0 w-full h-16 flex items-center justify-between px-4 shadow-md">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Home
      </div>
      <form className="flex-1 mx-4">
        <Input className="w-full" placeholder="Search..." type="search" />
      </form>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            handleLogOut();
          }}
          variant="outline"
        >
          Logout
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
};

export default NavBar;
function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
