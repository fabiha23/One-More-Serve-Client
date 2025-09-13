import React from "react";
import {
  FaLeaf,
  FaTint,
  FaFire,
  FaChartBar,
  FaUtensils,
  FaGlobeAmericas,
} from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const FoodWasteFacts = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  return (
    <div className="py-12">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/20 mb-4">
          <FaLeaf className="text-3xl text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-accent mb-3">
          Food Waste: The Hidden Crisis
        </h2>
        <p className="text-xl text-accent/80 max-w-3xl mx-auto">
          Every meal wasted is a missed opportunity to feed someone in need
        </p>
      </div>

      {/* By The Numbers */}
      <div className="mb-10">
        <h3 className="flex items-center text-2xl font-semibold text-accent mb-8">
          <FaChartBar className="mr-3 text-primary" />
          By The Numbers
        </h3>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Local Impact */}
          <div className="bg-base-100 p-6 rounded-lg border border-neutral/20">
            <h4 className="flex items-center text-lg font-medium text-accent mb-4">
              <FaGlobeAmericas className="mr-2 text-secondary" />
              Your Area
            </h4>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-accent/70">Food Wasted</span>
                <span className="font-semibold">1.2M kg/month</span>
              </li>
              <li className="flex justify-between">
                <span className="text-accent/70">Could Feed</span>
                <span className="font-semibold">
                  {inView ? (
                    <CountUp end={800000} duration={4} separator="," />
                  ) : (
                    "0"
                  )}
                  people
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-accent/70">Value Lost</span>
                <span className="font-semibold">$3M monthly</span>
              </li>
            </ul>
          </div>

          {/* Global Impact */}
          <div className="bg-base-100 p-6 rounded-lg border border-neutral/20">
            <h4 className="flex items-center text-lg font-medium text-accent mb-4">
              <FaGlobeAmericas className="mr-2 text-secondary" />
              Global
            </h4>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-accent/70">Food Wasted</span>
                <span className="font-semibold">1.3B tons/year</span>
              </li>
              <li className="flex justify-between">
                <span className="text-accent/70">Could Feed</span>
                <span className="font-semibold">
                  {
                    inView?<CountUp end={2000000000} duration={4} separator="," />:'0'
                  } people
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-accent/70">Value Lost</span>
                <span className="font-semibold">$1T annually</span>
              </li>
            </ul>
          </div>

          {/* Environmental Impact */}
          <div className="bg-base-100 p-6 rounded-lg border border-neutral/20">
            <h4 className="flex items-center text-lg font-medium text-accent mb-4">
              <FaLeaf className="mr-2 text-secondary" />
              Environmental Cost
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center mb-1">
                  <FaFire className="mr-2 text-red-400" />
                  <span className="text-accent/70">Carbon Footprint</span>
                </div>
                <div className="w-full bg-neutral/20 rounded-full h-2.5">
                  <div
                    className="bg-secondary h-2.5 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <p className="text-sm mt-1 text-accent/70">
                  Food waste = 8% of global GHG (Aviation: 2.5%)
                </p>
              </div>

              <div>
                <div className="flex items-center mb-1">
                  <FaTint className="mr-2 text-blue-400" />
                  <span className="text-accent/70">Water Waste</span>
                </div>
                <div className="w-full bg-neutral/20 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <p className="text-sm mt-1 text-accent/70">
                  1kg wasted beef = 15,000L water
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="text-center">
        <p className="text-sm text-accent/70 mt-4">
          Sources: FAO, World Bank, Local Waste Audits
        </p>
      </div>
    </div>
  );
};

export default FoodWasteFacts;
