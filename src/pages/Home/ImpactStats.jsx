import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  FaUserFriends,
  FaUtensils,
  FaLeaf,
  FaHandsHelping,
  FaStore, // for Partner Restaurants
  FaHandHoldingHeart, // for Charity Support
} from 'react-icons/fa';

const statsData = [
  {
    id: 1,
    icon: FaUserFriends,
    count: 1500,
    label: 'People Helped',
  },
  {
    id: 2,
    icon: FaUtensils,
    count: 1700,
    label: 'Meals Donated',
  },
  {
    id: 3,
    icon: FaLeaf,
    count: 2000,
    label: 'Kg Food Saved',
  },
  {
    id: 4,
    icon: FaHandsHelping,
    count: 300,
    label: 'Volunteers',
  },
  {
    id: 5,
    icon: FaStore,
    count: 120,
    label: 'Partner Restaurants',
  },
  {
    id: 6,
    icon: FaHandHoldingHeart,
    count: 45,
    label: 'Charities Supported',
  },
];

const ImpactStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="py-12 rounded-lg">
      <h2 className="text-3xl font-bold text-accent text-center mb-8">Our Impact</h2>
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
      >
        {statsData.map(({ id, icon: Icon, count, label }) => (
          <div
            key={id}
            className="flex flex-col items-center bg-base-100 rounded-lg p-6 shadow-md"
          >
            <Icon className="text-secondary mb-3" size={48} />
            <div className="text-3xl font-extrabold text-accent">
              {inView ? <CountUp end={count} duration={2.5} separator="," /> : '0'}
            </div>
            <p className="mt-2 text-accent text-xl font-medium text-center">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
