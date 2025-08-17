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
    color: 'text-blue-400'
  },
  {
    id: 2,
    icon: FaLeaf,
    count: 500,
    label: 'Food Saved (kg)',
    color: 'text-emerald-400'
  },
  {
    id: 3,
    icon: FaRecycle,
    count: 68,
    label: 'Waste Reduction %',
    color: 'text-secondary'
  },
  {
    id: 4,
    icon: FaStore,
    count: 100,
    label: 'Partner Restaurants',
    color: 'text-rose-400'
  },
  {
    id: 5,
    icon: FaHandHoldingHeart,
    count: 45,
    label: 'Charity Partners',
    color: 'text-violet-400'
  },
  {
    id: 6,
    icon: FaUserFriends,
    count: 200,
    label: 'Volunteers',
    color: 'text-pink-400'
  }
];

const ImpactStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className="py-10">
        <h2 className="text-3xl font-bold text-accent text-center mb-12 relative">
          Our Impact
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {statsData.map(({ id, icon: Icon, count, label, color }) => (
            <div
              key={id}
              className="flex flex-col items-center bg-base-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`${color} mb-4 p-4 rounded-full bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                <Icon size={32} />
              </div>
              <div className="text-4xl font-extrabold text-accent mb-2">
                {inView ? (
                  <CountUp 
                    end={count} 
                    duration={2.5} 
                    suffix={id === 3 ? "%" : ""} 
                    separator=","
                    className="font-mono"
                  />
                ) : '0'}
              </div>
              <p className="text-accent/80 text-lg font-medium text-center">{label}</p>
            </div>
          ))}
        </div>
    </section>
  );
};

export default ImpactStats;