import { jwtDecode } from "jwt-decode";
import moment from "moment";

// // Adjust path as necessary // Adjust path as necessary // Adjust path as necessary
const secretKey = "thisisasamplesecret";
export const extractDatesFromApiKey = async (apiKey) => {
  console.log("api<<<<<>>>>", apiKey);
  try {
    console.log("first", secretKey);
    //     // Verify and decode the API key
    const decoded = await jwtDecode(apiKey);
    console.log(decoded);
    console.log(">>", decoded);
    // console.log("decoded", decoded);
    //     // Convert the Unix timestamps to Date objects
    // const startDate = new Date(decoded.start * 1000);
    // const endDate = new Date(decoded.end * 1000);
    // const today = new Date();

    // Check if today's date falls within the subscription period
    // if (endDate < today) {
    //   return {
    //     valid: false,
    //     message: "The API key is expired.",
    //     startDate: startDate.toISOString(),
    //     endDate: endDate.toISOString(),
    //   };
    // } else if (startDate > today) {
    //   return {
    //     valid: false,
    //     message: "The plan will activate on " + startDate.toISOString(),
    //     startDate: startDate.toISOString(),
    //     endDate: endDate.toISOString(),
    //   };
    // } else {
    //   return {
    //     valid: true,
    //     message: "The API key is valid.",
    //     startDate: startDate.toISOString(),
    //     endDate: endDate.toISOString(),
    //   };
    // }
  } catch (error) {
    return {
      valid: false,
      message: "Failed to decode the API key: " + error.message,
    };
  }
};
