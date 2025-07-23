// import React from 'react';
// import { useForm } from 'react-hook-form';
// import useAxios from '../../hooks/useAxios';
// import Swal from 'sweetalert2';

// const RequestDonationModal = ({ donation, charityInfo, closeModal, refetch }) => {
//   const { register, handleSubmit, reset } = useForm();
//   const axiosInstance = useAxios();

//   const onSubmit = async (data) => {
//     try {
//       await axiosInstance.post('/donation-requests', {
//         ...data,
//         status: 'Pending',
//         donationId: donation._id,
//       });
//       Swal.fire('Requested!', 'Your donation request has been sent.', 'success');
//       closeModal();
//       reset();
//       refetch?.();
//     } catch (err) {
//       Swal.fire('Error', err.message, 'error');
//     }
//   };

//   return (
//     <dialog id="request_donation_modal" className="modal" open>
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">Request Donation</h3>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
//           <input {...register('donationTitle')} value={donation.title} readOnly className="input input-bordered w-full" />
//           <input {...register('restaurantName')} value={donation.restaurantName} readOnly className="input input-bordered w-full" />
//           <input {...register('charityName')} value={charityInfo.name} readOnly className="input input-bordered w-full" />
//           <input {...register('charityEmail')} value={charityInfo.email} readOnly className="input input-bordered w-full" />
//           <textarea {...register('requestDescription')} placeholder="Request Description" required className="textarea textarea-bordered w-full" />
//           <input type="datetime-local" {...register('pickupTime')} required className="input input-bordered w-full" />
//           <div className="modal-action">
//             <button type="submit" className="btn btn-primary">Submit</button>
//             <button type="button" onClick={closeModal} className="btn">Close</button>
//           </div>
//         </form>
//       </div>
//     </dialog>
//   );
// };

// export default RequestDonationModal;
