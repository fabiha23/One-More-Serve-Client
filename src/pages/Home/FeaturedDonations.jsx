// FeaturedDonations.jsx

import { Link } from "react-router";

const dummyDonations = [
  {
    id: 1,
    image: "https://i.ibb.co/zhDy7FZL/Screenshot-2025-05-23-202210.png",
    type: "Bakery Items",
    restaurant: "Sweet Delights",
    location: "Downtown, City Center",
    status: "Available",
  },
  {
    id: 2,
    image: "https://i.ibb.co/zhDy7FZL/Screenshot-2025-05-23-202210.png",
    type: "Fresh Produce",
    restaurant: "Green Farm Deli",
    location: "North Market Street",
    status: "Picked Up",
  },
  {
    id: 3,
    image: "https://i.ibb.co/zhDy7FZL/Screenshot-2025-05-23-202210.png",
    type: "Grocery Pack",
    restaurant: "Family Mart",
    location: "East Side",
    status: "Available",
  },
  {
    id: 4,
    image: "https://i.ibb.co/zhDy7FZL/Screenshot-2025-05-23-202210.png",
    type: "Cooked Meals",
    restaurant: "Home Bistro",
    location: "West Avenue",
    status: "Available",
  },
];

const FeaturedDonations = () => {
  return (
    <section className="py-10 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-accent mb-6 text-center">
          Featured Donations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyDonations.map((donation) => (
            <div
              key={donation.id}
              className="card bg-base-100 shadow-md border border-neutral rounded-2xl overflow-hidden"
            >
              <figure>
                <img
                  src={donation.image}
                  alt={donation.type}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="text-xl font-semibold text-primary">
                  {donation.type}
                </h3>
                <p className="text-accent text-sm">
                  {donation.restaurant} — {donation.location}
                </p>
                <p
                  className={`badge mt-2 ${
                    donation.status === "Available"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {donation.status}
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link to={`/donations/${donation.id}`}>
                    <button className="btn btn-secondary btn-sm rounded-xl">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDonations;
