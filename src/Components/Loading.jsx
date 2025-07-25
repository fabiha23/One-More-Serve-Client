import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <HashLoader color="#4b2840" speedMultiplier={0.9} size={65} />
    </div>
  );
};

export default Loading;
