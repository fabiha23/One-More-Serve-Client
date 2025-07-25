import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router';

const Forbidden = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/Lock.json') // make sure this is in your public folder
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => {
        console.error("Failed to load forbidden.json");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4 text-center">
      <div className="max-w-md mx-auto">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ height: '300px'}}
          />
        )}

        <h1 className="text-4xl font-bold text-error mb-4">403 - Forbidden</h1>

        <p className="text-xl text-accent mb-6">
          You don't have permission to access this page.
        </p>

        <div className="space-y-3">
          <p className="text-accent/80">
            If you believe this is an error, please contact support.
          </p>

          <Link to='/'><button
            className="btn btn-primary mt-6"
          >
            Go Back to Home
          </button></Link>

          <p className="text-sm text-accent/50 mt-8">
            Error code: 403_FORBIDDEN_ACCESS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
