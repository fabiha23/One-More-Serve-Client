import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  FaUtensils,
  FaLeaf,
  FaHandsHelping,
  FaStore,
  FaHandHoldingHeart,
  FaRecycle,
  FaUserFriends
} from 'react-icons/fa';

const statsData = [
  {
    id: 1,
    icon: FaUtensils,
    count: 700,
    label: 'Meals Donated',
    color: 'text-blue-500' // Bright blue
  },
  {
    id: 2,
    icon: FaLeaf,
    count: 500,
    label: 'Food Saved (kg)',
    color: 'text-green-500' // Vibrant green
  },
  {
    id: 3,
    icon: FaRecycle,
    count: 68,
    label: 'Waste Reduction %',
    color: 'text-secondary' // Orange
  },
  {
    id: 4,
    icon: FaStore,
    count: 100,
    label: 'Partner Restaurants',
    color: 'text-red-500' // Bright red
  },
  {
    id: 5,
    icon: FaHandHoldingHeart,
    count: 45,
    label: 'Charity Partners',
    color: 'text-purple-500' // Purple
  },
  {
    id: 6,
    icon: FaUserFriends,
    count: 200,
    label: 'Volunteers',
    color: 'text-pink-500' // Pink
  }
];

const ImpactStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  return (
    <section className="py-12 rounded-lg">
      <h2 className="text-3xl font-bold text-accent text-center mb-8">Our Impact</h2>
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
      >
        {statsData.map(({ id, icon: Icon, count, label, color }) => (
          <div
            key={id}
            className="flex flex-col items-center bg-base-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Icon className={`${color} mb-3`} size={48} />
            <div className="text-3xl font-extrabold text-accent">
              {inView ? <CountUp end={count} duration={2.5} suffix={id === 3 ? "%" : ""} separator="," /> : '0'}
            </div>
            <p className="mt-2 text-accent text-lg font-medium text-center">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;