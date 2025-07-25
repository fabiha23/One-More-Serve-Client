import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router';

const PageNotFound = () => {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch('/error.json') // Your 404 animation JSON in public folder
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch(() => {
                console.log("Animation failed to load");
            });
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-4 text-center">
            <div className="max-w-md mx-auto">
                {/* Lottie Animation */}
                <div className="w-64 h-64 mx-auto">
                    {animationData ? (
                        <Lottie 
                            animationData={animationData} 
                            loop={true} 
                            autoplay={true}
                                        style={{ height: '350px'}}

                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <span className="loading loading-spinner loading-lg text-secondary"></span>
                        </div>
                    )}
                </div>
                
                {/* Error Message */}
                <h1 className="text-4xl font-bold text-error">404 - Page Not Found</h1>
                
                <p className="text-xl text-accent my-4">
                    Oops! The page you're looking for doesn't exist.
                </p>
                
                {/* Action Buttons */}
                <Link to='/'><button
                            className="btn btn-primary"
                          >
                            Go Back to Home
                          </button></Link>
                
                {/* Technical Info */}
                <p className="text-sm text-accent/50 my-8 mb-14">
                    Error code: 404_PAGE_NOT_FOUND
                </p>
            </div>
        </div>
    );
};

export default PageNotFound;