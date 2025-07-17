import React from "react";
import { Outlet } from "react-router";
import Banner from "./Banner";
import FeaturedDonations from "./FeaturedDonations";
import LatestCharityRequests from "./LatestCharityRequests";
import Footer from "../../Components/Footer";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="bg-base-200 ">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <FeaturedDonations></FeaturedDonations>
        </div>
      </div>
      <div className="bg-base-200 ">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <LatestCharityRequests></LatestCharityRequests>
        </div>
      </div>
    </div>
  );
};

export default Home;
