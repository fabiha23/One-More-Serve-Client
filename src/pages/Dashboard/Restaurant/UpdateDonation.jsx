import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  FaUtensils, 
  FaWeightHanging, 
  FaClock, 
  FaMapMarkerAlt, 
  FaCamera 
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";
import useAxios from "../../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

const UpdateDonation = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [imageUrl, setImageUrl] = useState("");
  const donation = state?.donation;

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue 
  } = useForm();

  // Pre-fill form with donation data
  useEffect(() => {
    if (donation) {
      setValue("title", donation?.title);
      setValue("foodType", donation?.foodType);
      
      // Split quantity into value and unit
      const quantityParts = donation?.quantity?.split(" ");
      setValue("quantity", quantityParts[0]);
      setValue("quantityUnit", quantityParts[1] || "portions");
      
      setValue("pickupStart", donation?.pickupStart.split('T')[0]);
      setValue("pickupEnd", donation?.pickupEnd.split('T')[0]);
      setValue("location", donation?.location);
      
      setImageUrl(donation?.donationImage);
    }
  }, [donation, setValue]);

  const { mutate: updateDonation, isPending } = useMutation({
    mutationKey: ["update-donation"],
    mutationFn: async (donationData) => {
      const { data } = await axiosInstance.put(`/donations/${donation?._id}`, donationData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Donation Updated!",
        text: "Donation has been updated successfully",
        icon: "success",
        timer: 3000,
        confirmButtonColor: "#10B981",
      });
      navigate("/dashboard/my-donations");
    },
    onError: (error) => {
      Swal.fire({
        title: "Update Failed",
        text: error?.response?.data?.message || "Failed to update donation",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    },
  });

  const handleImageUpload = async (e) => {
    const image = e?.target?.files[0];
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );

      setImageUrl(response?.data?.data?.url);
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire({
        title: "Upload Failed",
        text: "Failed to upload image. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  const onSubmit = async (data) => {
    const donationData = {
      ...data,
      quantity: `${data.quantity} ${data.quantityUnit}`,
      donationImage: imageUrl,
      updatedAt: new Date().toISOString()
    };
    updateDonation(donationData);
  };

  if (isPending) return <Loading></Loading>;

  return (
    <>
      <h2 className="text-base-100 font-semibold text-2xl mb-3 bg-secondary p-4 rounded-lg px-6">
        Update Donation
      </h2>
      <div className="p-6 bg-base-100 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <fieldset className="fieldset bg-base-200 p-3 rounded-box">
            <label className="text-accent font-semibold text-base">
              Donation Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`input w-full focus:outline-0 focus:border-neutral focus:shadow-md ${
                errors.title ? "input-error" : ""
              }`}
              placeholder="e.g., Surplus Pastries, Fresh Vegetables"
            />
            {errors.title && (
              <span className="text-error text-sm mt-1">
                {errors?.title?.message}
              </span>
            )}
          </fieldset>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <fieldset className="fieldset bg-base-200 p-3 rounded-box">
              <label className="text-accent font-semibold text-base">
                Food Type
              </label>
              <select
                {...register("foodType", { required: "Food type is required" })}
                className={`select w-full focus:outline-0 focus:border-neutral focus:shadow-md ${
                  errors.foodType ? "select-error" : ""
                }`}
              >
                <option value="">Select food type</option>
                <option value="Bakery">Bakery</option>
                <option value="Produce">Produce</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Prepared Meals">Prepared Meals</option>
                <option value="Other">Other</option>
              </select>
              {errors.foodType && (
                <span className="text-error text-sm mt-1">
                  {errors?.foodType?.message}
                </span>
              )}
            </fieldset>

            <fieldset className="fieldset bg-base-200 p-3 rounded-box">
              <label className="text-accent font-semibold text-base">
                Quantity
              </label>
              <div className="flex">
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Must be at least 1" },
                  })}
                  className={`input w-3/4 rounded-r-none focus:outline-0 focus:border-neutral focus:shadow-md ${
                    errors.quantity ? "input-error" : ""
                  }`}
                  placeholder="10"
                />
                <select
                  {...register("quantityUnit")}
                  className="select w-1/4 rounded-l-none focus:outline-0 focus:border-neutral focus:shadow-md"
                >
                  <option value="portions">Portions</option>
                  <option value="kg">Kilograms</option>
                  <option value="lbs">Pounds</option>
                </select>
              </div>
              {errors.quantity && (
                <span className="text-error text-sm mt-1">
                  {errors?.quantity?.message}
                </span>
              )}
            </fieldset>

            <fieldset className="fieldset bg-base-200 p-3 rounded-box">
              <label className="text-accent font-semibold text-base">
                Pickup Start Time
              </label>
              <input
                type="date"
                {...register("pickupStart", {
                  required: "Pickup start time is required",
                })}
                className={`input w-full focus:outline-0 focus:border-neutral focus:shadow-md ${
                  errors.pickupStart ? "input-error" : ""
                }`}
              />
              {errors.pickupStart && (
                <span className="text-error text-sm mt-1">
                  {errors?.pickupStart?.message}
                </span>
              )}
            </fieldset>

            <fieldset className="fieldset bg-base-200 p-3 rounded-box">
              <label className="text-accent font-semibold text-base">
                Pickup End Time
              </label>
              <input
                type="date"
                {...register("pickupEnd", {
                  required: "Pickup end time is required",
                })}
                className={`input w-full focus:outline-0 focus:border-neutral focus:shadow-md ${
                  errors.pickupEnd ? "input-error" : ""
                }`}
              />
              {errors.pickupEnd && (
                <span className="text-error text-sm mt-1">
                  {errors?.pickupEnd?.message}
                </span>
              )}
            </fieldset>

            <fieldset className="fieldset bg-base-200 p-3 rounded-box">
              <label className="text-accent font-semibold text-base">
                Restaurant Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input w-full focus:outline-0 focus:border-neutral focus:shadow-md"
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 p-3 rounded-box">
              <label className="text-accent font-semibold text-base">
                Restaurant Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input w-full focus:outline-0 focus:border-neutral focus:shadow-md"
              />
            </fieldset>
          </div>

          <fieldset className="fieldset bg-base-200 p-3 rounded-box">
            <label className="text-accent font-semibold text-base">
              Pickup Location
            </label>
            <select
              {...register("location", { required: "Location is required" })}
              className={`select w-full focus:outline-0 focus:border-neutral focus:shadow-md ${
                errors.location ? "select-error" : ""
              }`}
            >
              <option value="">Select a city</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Khulna">Khulna</option>
              <option value="Barishal">Barishal</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
            {errors.location && (
              <span className="text-error text-sm mt-1">
                {errors?.location?.message}
              </span>
            )}
          </fieldset>

          <fieldset className="fieldset bg-base-200 p-3 rounded-box">
            <label className="text-accent font-semibold text-base">
              Food Image
            </label>
            <div className="flex items-center gap-4">
              {imageUrl ? (
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-neutral/20 relative">
                  <img
                    src={imageUrl}
                    alt="Uploaded food"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="absolute top-1 right-1 bg-primary text-white rounded-full font-bold w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full border-2 border-accent border-dashed rounded-lg cursor-pointer bg-base-100 hover:bg-neutral/20">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-2 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-xs text-accent">PNG, JPG</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </fieldset>

          <input
            type="submit"
            value="Update Donation"
            className={`bg-primary text-base-100 w-full py-2 rounded-md text-lg font-semibold cursor-pointer hover:bg-secondary duration-300`}
          />
        </form>
      </div>
    </>
  );
};

export default UpdateDonation;