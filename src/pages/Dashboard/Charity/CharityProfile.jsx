import { FaHandsHelping, FaEnvelope, FaCalendarAlt, FaClock, FaPhone, FaMapMarkerAlt, FaUsers, FaDonate } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";

const CharityProfile = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: Userdata, isLoading } = useQuery({
    queryKey: ["single-user", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users?email=${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  const charityData = Userdata?.[0] || {};

  return (
    <div>
      <h2 className="text-base-100 font-semibold text-2xl mb-3 bg-secondary p-4 rounded-lg">
        Charity Profile
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-1/2 p-6 bg-base-100 rounded-lg shadow-lg">
          {/* Charity Logo and Name */}
          <div className="flex items-center mb-8">
            <div className="w-24 h-24 bg-base-200 rounded-full overflow-hidden shadow-md mr-6">
              <img
                src={charityData?.photoURL || "/default-charity.jpg"}
                alt={charityData?.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-accent">
                {charityData?.name || "Coming Soon"}
              </h1>
              <div className="flex items-center mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  <FaHandsHelping className="mr-1" />
                  {charityData?.role || "Charity Organization"}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Contact Information
            </h3>
            
            <div className="flex items-start">
              <FaEnvelope className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-accent">{charityData?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaPhone className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-accent">{charityData?.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-accent">{charityData?.address || "Not provided"}</p>
                {charityData?.serviceArea && (
                  <p className="text-sm text-accent/70 mt-1">
                    Service Area: {charityData.serviceArea}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Organization Information
            </h3>
            
            <div className="flex items-start">
              <FaCalendarAlt className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Established Date</p>
                <p className="text-accent">
                  {charityData?.establishedDate
                    ? new Date(charityData?.establishedDate).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaUsers className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Beneficiaries Served</p>
                <p className="text-accent">
                  {charityData?.beneficiariesServed || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 p-6 bg-base-100 rounded-lg shadow-lg">
          {/* Charity Operations */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Charity Operations
            </h3>
            
            <div className="flex items-start">
              <FaClock className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Operating Hours</p>
                <p className="text-accent">
                  {charityData?.operatingHours || "9:00 AM - 5:00 PM"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaHandsHelping className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Mission Statement</p>
                <p className="text-accent">
                  {charityData?.missionStatement || "To serve those in need with dignity and compassion"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaUsers className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Target Population</p>
                <p className="text-accent">
                  {charityData?.targetPopulation || "Homeless, Low-income families, Refugees"}
                </p>
              </div>
            </div>
          </div>

          {/* Food Donation Information */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Food Donation Details
            </h3>
            
            <div className="flex items-start">
              <FaDonate className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Donation Acceptance</p>
                <p className="text-accent">
                  {charityData?.donationAcceptance || "Prepared meals, Non-perishables, Fresh produce"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaClock className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Preferred Drop-off Times</p>
                <p className="text-accent">
                  {charityData?.preferredDropoffTimes || "Weekdays 9AM-3PM"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaHandsHelping className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Distribution Schedule</p>
                <p className="text-accent">
                  {charityData?.distributionSchedule || "Daily meal service, Weekly food pantry"}
                </p>
              </div>
            </div>
          </div>

          {/* Certification Information */}
          {charityData?.certifications && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-accent border-b pb-2">
                Certifications
              </h3>
              
              <div className="flex items-start">
                <FaHandsHelping className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
                <div>
                  <p className="text-sm font-medium text-accent/80">501(c)(3) Status</p>
                  <p className="text-accent">
                    {charityData.certifications.taxExempt ? "Verified" : "Not verified"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;