import { Button } from "@/components/ui/button";
import { removeUser } from "@/utils/organizationSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import NavBar from "@/components/NavBar";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allApps, setApps] = useState(null);

  const handleSubscription = () => {
    navigate(`/apps/${1}`);
    console.log("subscribe", app);
  };
  const getApps = async () => {
    try {
      console.log(">>>>>>HHHHHHH");
      let apps = await axios.get("/apps/all");
      console.log("data", apps.data);
      await setApps(apps.data);
      console.log("appState", allApps);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getApps();
  }, []);
  return (
    <div className=" flex  flex-col pt-10 mt-10  justify-center items-center ">
      {/* <Button onClick={handleLogOut}>LogOut</Button> */}
      <NavBar />

      <main className="flex flex-1 flex-col  p-4 md:gap-8 md:p-6">
        <div className="flex ">
          <h1 className="font-semibold text-lg md:text-2xl">Applications</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card key={1}>
            <CardHeader>
              <CardTitle>My Super App</CardTitle>
              <CardDescription>description</CardDescription>
            </CardHeader>
            <CardContent>Relevant data for App </CardContent>
            <div className="flex w-full justify-center item-center">
              <Button
                onClick={() => handleSubscription()}
                className="w-full m-2 "
              >
                OPEN
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
