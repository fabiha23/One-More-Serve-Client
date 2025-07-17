import React from "react";

const LatestCharityRequests = () => {
  const charities = [
    {
      name: "Helping Hands",
      image: "https://i.ibb.co/21D28t8y/Screenshot-2025-05-23-200720.png",
      description: "Seeking donations for daily meals in underprivileged areas.",
      foodTitle: "Daily Meal Program",
    },
    {
      name: "Food For All",
      image: "https://i.ibb.co/21D28t8y/Screenshot-2025-05-23-200720.png",
      description: "Urgent request for dry ration kits for flood victims.",
      foodTitle: "Dry Ration Support",
    },
    {
      name: "Care & Share",
      image: "https://i.ibb.co/21D28t8y/Screenshot-2025-05-23-200720.png",
      description: "Collecting cooked food for community kitchens.",
      foodTitle: "Community Kitchen Drive",
    },
  ];

  return (
    <section className="py-12 px-4 bg-base-200">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary mb-8">
          Latest Charity Requests
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {charities.map((charity, idx) => (
            <div
              key={idx}
              className="bg-base-100 border border-neutral rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200"
            >
              <img
                src={charity.image}
                alt={charity.name}
                className="h-24 w-24 mx-auto object-cover rounded-full mb-4 border border-neutral/30"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {charity.name}
              </h3>
              <p className="text-accent text-sm mb-3">{charity.description}</p>
              <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-xs font-medium">
                {charity.foodTitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCharityRequests;
