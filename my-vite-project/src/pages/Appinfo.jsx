import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "../utils/axiosConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addData, updateData } from "@/utils/dataSlice";
import { extractDatesFromApiKey } from "@/utils/apikey";
import NavBar from "@/components/NavBar";

const AppInfo = () => {
  const [apiKey, setApikey] = useState({
    apiKey: "",
  });
  console.log("apiKey>>", apiKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [open, setOpen] = useState(false);
  console.log("opennnn", open);
  console.log(params.appId);
  const appId = params.appId;
  const [app, setApp] = useState();
  console.log("???????", app);
  const [isActiveSubScription, setIsActiveSubScription] = useState(false);
  const [apiKeyInfo, setApiKeyInfo] = useState();
  console.log("apiKeyInfoKKKKKKKKKKKKKKKKKKKKKKKKK", apiKeyInfo);
  const Organization = useSelector(
    (state) => state.organizationSlice.organizationData.id
  );
  console.log(">>>>>>>>>>>>>>>>>>", Organization);

  // console.log("dfnsn??????????????????????????????", organization);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  console.log("subscriptionInfo<<<<<", subscriptionInfo);
  const ipcRenderer = window.electron?.ipcRenderer || {}; // ipcRenderer allowing for messaging between the renderer process (the web page) and the main process.
  console.log("window", window.electron.ipcRenderer);
  useEffect(() => {
    const fetchData = async () => {
      await getApp();
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Here useEffect get subscription details");
    const fetchData = async () => {
      getSubscriptionInfo();
    };

    fetchData();
  }, [app, subscriptionInfo]);
  useEffect(() => {
    console.log("Here isOnline useEffect");
    getApp();
  }, [appId, open]);
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    // Clean up listeners
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  const getSubscriptionInfo = async () => {
    console.log("call for getSubscriptionInfo", Organization, appId);
    try {
      let subscription = await axios.get(`/appSubscribe/${appId}`, {
        headers: {
          Organization: Organization,
        },
      });
      console.log("heree");
      console.log("subscription>>>", subscription);
      if (subscription.data === null) {
        setIsActiveSubScription(false);
      }

      if (subscription.data) {
        console.log("setting subscription", subscription.data, "<<<<<");
        setApiKeyInfo(subscription.data.apiKeyInfo);

        console.log(
          "apiKeyInfo<<<<<<<<<<<<<<<<<<<<<<",
          apiKeyInfo
          // subscription.data.data.apiKeyInfo.valid
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getApp = async () => {
    // console.log("inside getapp", organization);
    try {
      console.log("fetchingn app data", appId);
      let response = await axios.get(`/apps/${appId}`, {
        // headers: {
        //   Organization: organization,
        // },
      });
      const app = response.data;
      console.log("printing app data");
      console.log(">>>>>>apps>>> ", app);
      setApp(app);
      console.log("appp", app);

      // setSubscriptionInfo(apps.data.appsubscription.apiKeyInfo);
      //console.log("subscriptionInfo", subscriptionInfo);
      // if (subscriptionInfo?.valid === true) {
      //   setIsActiveSubScription(true);
      //   console.log("valid", isActiveSubScription);
      // } else {
      //   setIsActiveSubScription(false);
      // }
      // if (app) {
      //   // Ensure `app` is not null
      //   setFormData((prevFormData) => ({
      //     ...prevFormData,
      //     appName: app.appName, // Update `appName` in formData
      //   }));
      // }
      console.log("app >>>", app);
    } catch (err) {
      console.log(err);
    }
  };

  const [formData, setFormData] = useState({
    appId: appId,
    appName: "",
    startDate: "",
    endDate: "",
    organizationId: Organization,
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

  const handleApIKeyChange = (e) => {
    const { name, value } = e.target;
    setApikey({
      ...apiKey,
      [name]: value,
    });
    console.log(">>>>", apiKey);
  };

  const GenerateApiKey = async () => {
    // navigate(`/apps/${app.id}`);
    console.log("FormData", formData);
    const api = await axios.post("/appSubscribe", { formData });
    console.log("updatedOrganization,", api.data);
    dispatch(updateData(api.data));
    // setModal(!isModal);
    alert("success");
    navigate();
    setOpen(false);
    console.log("open", open);
  };
  const OpenApp = () => {
    // function for trigger applications installed in pc in react
    //it use ipc render from  electron to communicate with main process
    //eg:  window.electron.ipcRenderer.send("open-app", "notepad");

    //

    setOpen(false); // Close your dialog or perform other UI actions

    // Close your dialog or perform other UI actions
    console.log("trigger next>>");
    const command = `"C:\\Users\\RANJITH\\AppData\\Local\\Programs\\electron-app\\electron-app.exe"`;

    if (ipcRenderer) {
      console.log("ipcRenderer is present");
    } else {
      console.log("ipcRenderer is not present");
    }

    if (typeof ipcRenderer.send === "function") {
      console.log("hereeeee");
      ipcRenderer.send("open-app", command);
    } else {
      console.log("not a function");
    }
  };
  const OpenWeb = () => {
    const url = app.appUrl;
    // Check if the URL is absolute

    if (/^https?:\/\//.test(url)) {
      // It's an absolute URL, use window.location.href to navigate
      window.location.href = url;
    } else {
      // It's a relative URL, use navigate
      // navigate(`./${url}`);
      navigate(`http://localhost:3006/`);
    }
  };
  const checkApiKeyOffline = () => {
    function decodeJWT(token) {
      // Split the JWT into its three parts
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("The token is invalid");
      }

      // Decode the payload
      const payload = parts[1];
      const decodedPayload = atob(
        payload.replace(/-/g, "+").replace(/_/g, "/")
      );
      console.log("api validity");
      // Parse the JSON payload
      return JSON.parse(decodedPayload);
    }

    const token = apiKey.apiKey;
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY1YmM4ZjA3ODQ0MGJjNjM4NDVjYTgzMCIsInN0YXJ0IjoxNzA2NzI1ODAwLCJlbmQiOjE3MDc1MDM0MDAsInR5cGUiOiJhcHBBY2Nlc3MiLCJwZXJtaXNzaW9ucyI6WyJyZWFkIl0sImlhdCI6MTcwNzEzMTYwNCwiaXNzIjoiaXNzdWVkIGJ5IGNyYWZ0ZWNoMzYwIn0.tdOrmOcXPzeFLUW1FBBqZzexEdgsycMuYjN_wfx3xsE";
    const decoded = decodeJWT(token);
    console.log(">>>>", decoded);

    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < decoded.end) {
      console.log("API key is valid and not expired.");
      alert("valid api");
      window.location.href = "http://localhost:3006";
    } else {
      console.log("API key has expired.");
      alert("API key has expired.");
      // API key is expired, handle accordingly (e.g., show an error message)
    }
  };
  return (
    <div className="flex   justify-center items-center p-10 mt-10">
      <NavBar />

      <div className=" w-96">
        {" "}
        {app ? (
          <Card className=" p-2 m-2 flex flex-col justify-center items-center">
            <CardHeader>
              <CardTitle>{app.appName}</CardTitle>
              <CardDescription>{app.description}</CardDescription>
            </CardHeader>
            <CardContent>Relevant data for App 1</CardContent>
            {isOnline ? <>Online Status: Online</> : <>Online Status:Offline</>}
            {isOnline ? (
              <>
                {apiKeyInfo?.valid === false && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Subscribe</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Select subscription Dates</DialogTitle>
                        <DialogDescription>
                          Please select the start and end dates for your
                          subscription.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right" htmlFor="start-date">
                            Start Date
                          </Label>
                          <Input
                            onChange={handleChange}
                            className="col-span-3"
                            id="startDate"
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right" htmlFor="end-date">
                            End Date
                          </Label>
                          <Input
                            onChange={handleChange}
                            className="col-span-3"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            type="date"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => GenerateApiKey()} type="submit">
                          Generate ApiKey
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </>
            ) : (
              <></>
            )}

            {isOnline ? (
              <>
                {apiKeyInfo?.valid === true && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>confirm Opening the app?</DialogTitle>
                      </DialogHeader>

                      <DialogFooter className="m-1 p-1 gap-3">
                        <Button
                          className="bg-emerald-500"
                          onClick={() => OpenApp()}
                          type="submit"
                        >
                          Open
                        </Button>
                        <Button
                          className="bg-emerald-500"
                          onClick={() => OpenWeb()}
                          type="submit"
                        >
                          Open Web
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </>
            ) : (
              <>
                {" "}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Subscribe</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Select subscription Dates</DialogTitle>
                      <DialogDescription>
                        Please select the start and end dates for your
                        subscription.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="start-date">
                          Start Date
                        </Label>
                        <Input
                          onChange={handleChange}
                          className="col-span-3"
                          id="startDate"
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="end-date">
                          End Date
                        </Label>
                        <Input
                          onChange={handleChange}
                          className="col-span-3"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          type="date"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => GenerateApiKey()} type="submit">
                        Generate ApiKey
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{" "}
              </>
            )}
            {!isOnline ? (
              <>
                <DialogFooter className="flex  items-center flex-center">
                  <Label className="m-2 p-2 ">API KEY</Label>
                  <Input
                    className="m-2 p-2 "
                    type="text"
                    id="offlineInput"
                    name="apiKey"
                    onChange={handleApIKeyChange}
                    // Add additional attributes and event handlers as needed
                  />
                  <Button
                    onClick={() => checkApiKeyOffline()}
                    className="m-2 p-2 "
                  >
                    Submit
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <></>
            )}
            {/* <Button
            onClick={() => handleSubscription(app)}
            className="w-1/2 mb-2"
          >
            subscribe
          </Button> */}

            {/* {isOnline ? (
            <>
              {" "}
              {subscriptionInfo.valid ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>confirm Open ing the app?</DialogTitle>
                    </DialogHeader>

                    <DialogFooter>
                      <Button
                        className="bg-emerald-500"
                        onClick={() => OpenApp()}
                        type="submit"
                      >
                        Open
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Subscribe</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Select subscription Dates</DialogTitle>
                      <DialogDescription>
                        Please select the start and end dates for your
                        subscription.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="start-date">
                          Start Date
                        </Label>
                        <Input
                          onChange={handleChange}
                          className="col-span-3"
                          id="startDate"
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="end-date">
                          End Date
                        </Label>
                        <Input
                          onChange={handleChange}
                          className="col-span-3"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          type="date"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => GenerateApiKey()} type="submit">
                        Generate ApiKey
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}{" "}
            </>
          ) : (
            // Render an input box when the app is offline
            <DialogFooter className="flex  items-center flex-center">
              <Label className="m-2 p-2 ">API KEY</Label>
              <Input
                className="m-2 p-2 "
                type="text"
                id="offlineInput"
                name="apiKey"
                onChange={handleApIKeyChange}
                // Add additional attributes and event handlers as needed
              />
              <Button onClick={() => checkApiKeyOffline()} className="m-2 p-2 ">
                Submit
              </Button>
            </DialogFooter>
          )} */}
          </Card>
        ) : (
          <>Loading</>
        )}
      </div>
    </div>
  );
};

export default AppInfo;
