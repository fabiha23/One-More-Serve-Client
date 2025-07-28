import React from 'react';
import { FaUtensils, FaHandshake, FaHandsHelping } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <section className="text-center p-10">
      <h2 className="text-3xl font-bold mb-8 text-accent">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center p-6 border border-neutral rounded-lg shadow hover:shadow-lg transition">
          <FaUtensils size={40} className="text-secondary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Restaurants Donate</h3>
          <p className="text-accent">
            Restaurants list surplus food with details and pickup times.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center p-6 border border-neutral rounded-lg shadow hover:shadow-lg transition">
          <FaHandshake size={40} className="text-secondary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Charities Request</h3>
          <p className="text-accent">
            verified charities browse donations and request pickups.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center p-6 border border-neutral rounded-lg shadow hover:shadow-lg transition">
          <FaHandsHelping size={40} className="text-secondary mb-4" />
          <h3 className="text-xl font-semibold mb-2">We Connect Them</h3>
          <p className="text-accent">
            We link restaurants and charities for smooth handovers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
