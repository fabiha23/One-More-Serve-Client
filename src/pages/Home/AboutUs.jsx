import React from 'react';
import { FaHeart, FaHandsHelping, FaLeaf, FaStore, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import useAxios from '../../hooks/useAxios';

const AboutUs = () => {
    const axiosInstance = useAxios();

    // Fetch partners data
    const { data: partners, isLoading } = useQuery({
        queryKey: ['partners'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/users');
            return data;
        },
    });

    if (isLoading) return <Loading />;

    // Filter partners by role
    const restaurantPartners = partners?.filter(user => user.role === 'restaurant') || [];
    const charityPartners = partners?.filter(user => user.role === 'charity') || [];

    return (
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3 mt-22 text-accent">
            {/* Hero Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">About OneMore Serve</h1>
                <p className="text-xl max-w-3xl mx-auto">
                    Bridging the gap between surplus food and those in need, one meal at a time.
                </p>
            </div>

            {/* Our Story */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
                <div className="lg:w-1/2 bg-base-200 p-8 rounded-lg">
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="mb-4">
                        Founded in 2023, OneMore Serve began with a simple observation: restaurants and grocery stores 
                        often have perfectly good food that goes to waste, while many in our communities go hungry.
                    </p>
                    <p>
                        Our platform was created to connect these two realities - making it easy for food businesses 
                        to donate their surplus and for charities to receive nutritious food for those they serve.
                    </p>
                </div>
                <div className="lg:w-1/2 bg-base-200 p-8 rounded-lg">
                    <div className="flex items-center mb-4">
                        <FaHeart className="text-3xl mr-4" />
                        <h3 className="text-2xl font-bold">Our Mission</h3>
                    </div>
                    <p className="mb-6">
                        To reduce food waste and food insecurity by creating an efficient, transparent 
                        platform that connects food donors with community organizations.
                    </p>
                    <div className="flex items-center mb-4">
                        <FaLeaf className="text-3xl mr-4" />
                        <h3 className="text-2xl font-bold">Our Vision</h3>
                    </div>
                    <p>
                        A world where no edible food goes to waste while people go hungry, and where 
                        every community can redistribute surplus food effectively.
                    </p>
                </div>
            </div>

            {/* Partners Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Our Trusted Partners</h2>
                
                {/* Restaurant Partners */}
                <div className="mb-16">
                    <div className="flex items-center mb-6">
                        <FaStore className="text-2xl mr-3" />
                        <h3 className="text-2xl font-bold">Food Donors</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {restaurantPartners.map(partner => (
                            <div key={partner._id} className="bg-base-200 p-4 rounded-lg text-center">
                                <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full overflow-hidden">
                                    <img 
                                        src={partner.photoURL || '/default-restaurant.jpg'} 
                                        alt={partner.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="font-medium">{partner.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Charity Partners */}
                <div>
                    <div className="flex items-center mb-6">
                        <FaHandsHelping className="text-2xl mr-3" />
                        <h3 className="text-2xl font-bold">Charity Partners</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {charityPartners.map(partner => (
                            <div key={partner._id} className="bg-base-200 p-4 rounded-lg text-center">
                                <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full overflow-hidden">
                                    <img 
                                        src={partner.photoURL || '/default-charity.jpg'} 
                                        alt={partner.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="font-medium">{partner.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-secondary text-white p-12 rounded-xl text-center">
                <h2 className="text-3xl font-bold mb-6">Join Our Movement</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                    Whether you're a food business with surplus to donate or a charity looking to receive food, 
                    we'd love to have you as part of the OneMore Serve community.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Become a Food Donor
                    </button>
                    <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
                        Become a Charity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;