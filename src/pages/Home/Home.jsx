import React from "react";
import Banner from "./Banner";
import FeaturedDonations from "./FeaturedDonations";
import LatestCharityRequests from "./LatestCharityRequests";
import Footer from "../../Components/Footer";
import HowItWorks from "./HowItWorks";
import ImpactStats from "./ImpactStats";
import FoodWasteFacts from "./FoodWasteFacts";
import LiveFeedSection from "./LiveFeedSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="bg-base-100 ">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <FeaturedDonations></FeaturedDonations>
        </div>
      </div>
      <div className="bg-base-100 ">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <LatestCharityRequests></LatestCharityRequests>
        </div>
      </div>
      <div className="bg-base-100 ">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <HowItWorks></HowItWorks>
        </div>
      </div>
      <div className="bg-base-100 ">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <ImpactStats></ImpactStats>
        </div>
      </div>
      <div className="bg-base-200 ">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <FoodWasteFacts></FoodWasteFacts>
        </div>
      </div>
      <div className="bg-base-100 ">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <LiveFeedSection></LiveFeedSection>
        </div>
      </div>
    </div>
  );
};

export default Home;
