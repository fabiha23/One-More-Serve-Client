// import React from "react";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// const Rating = ({ stars, maxStars = 5 }) => {
//   const goldStars = [...new Array(stars).fill(1)]
//   const grayStars = [...new Array(maxStars - stars).fill(0)]
//   const allStars = [...goldStars, ...grayStars]

//   return (
//     <div className="flex items-center">
//       {allStars.map((item, index) =>
//         item == 1 ? (
//           <AiFillStar className="text-yellow-500" />
//         ) : (
//           <AiOutlineStar onClick={() => setCount(index + 1)} />
//         )
//       )}
//     </div>
//   );
// };

// export default Rating;