// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxios from '../../hooks/useAxios';
// import Loading from '../../Components/Loading';

// const ReviewSection = ({ donationId }) => {
//   const axiosInstance = useAxios();

//   const { data: reviews = [], isLoading } = useQuery({
//     queryKey: ['reviews', donationId],
//     queryFn: async () => {
//       const res = await axiosInstance.get(`/reviews?donationId=${donationId}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <Loading />;

//   return (
//     <div className="my-6">
//       <h3 className="text-lg font-semibold mb-2">Reviews</h3>
//       {reviews.length === 0 ? (
//         <p className="text-gray-500">No reviews yet.</p>
//       ) : (
//         <div className="space-y-2">
//           {reviews.map((review) => (
//             <div key={review._id} className="border p-2 rounded">
//               <div className="flex justify-between text-sm">
//                 <span className="font-bold">{review.reviewerName}</span>
//                 <span className="badge badge-success">{review.rating} ★</span>
//               </div>
//               <p className="text-sm">{review.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewSection;
