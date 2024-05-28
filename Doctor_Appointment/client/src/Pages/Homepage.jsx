import axios from "axios";
import React, { useEffect } from "react";

const Homepage = () => {
  const getUserData = async () => {
    try {
      const response = await axios.post(
        "/api/users/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      response.data
        ? console.log(response.data)
        : console.error("User Data not found");
    } catch (error) {
      console.error(error);
      console.error("User Data API Not Work Perfectly");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return <div>Homepage</div>;
};

export default Homepage;
