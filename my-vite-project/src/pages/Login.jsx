import { Button } from "@/components/ui/button";
import { addUser } from "@/utils/organizationSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Link } from "react-router-dom";
import { checkValidData } from "@/utils/validation";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    isTrial: true,
    planEndDate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For address fields, update nested state
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log("going to login");
    try {
      const response = await axios.post("/organizations/login", formData);

      if (response.status === 200) {
        // Login successful
        alert(`Logged in successfully!console.log;`);
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(response);
        console.log({
          organization: {
            name: response.data.organizationData.name,
            id: response.data.organizationData._id,
          },
          isOrganizationLoggedIn: true,
          tokens: {
            accessToken: response.data.tokens.accessToken,
            refreshToken: response.data.tokens.refreshToken,
          },
        });
        dispatch(
          addUser({
            organization: {
              name: response.data.organizationData.name,
              id: response.data.organizationData._id,
            },
            isOrganizationLoggedIn: true,
            tokens: {
              accessToken: response.data.tokens.accessToken,
              refreshToken: response.data.tokens.refreshToken,
            },
          })
        );

        navigate("/"); // Navigate to the home/dashboard page
      } else {
        // Handle other success status codes or unexpected responses
        console.error("Unexpected response:", response);
        // Set an error message or handle the response accordingly
      }
    } catch (error) {
      // Handle request failure or error
      console.error("Login failed:", error);
      // Set an error message or handle the error based on your requirements
    }
  };
  const handleLogin = () => {
    // Dispatch the addUser action with sample data
    // Replace it with actual data as needed
    dispatch(
      addUser({
        organization: {
          name: "Organization Name",
          id: "Organization ID",
        },
        isOrganizationLoggedIn: true,
        tokens: { accessToken: "access-token", refreshToken: "refresh-token" },
      })
    );
    navigate("/home");
  };
  return (
    <div className=" flex  flex-col pt-10 mt-10  justify-center items-center ">
      {/* <Button onClick={handleLogin}>Login</Button> */}
      <Card className="mx-auto max-w-sm space-y-4">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  className="absolute inset-y-0 right-0 h-7 w-7"
                  size="icon"
                  variant="ghost"
                >
                  <KeyIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <Link className="inline-block w-32 underline" href="#">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

function KeyIcon(props) {
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
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}
