import React from "react";
import { FaBalanceScale, FaShieldAlt, FaUserLock, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";

const TermsCondition = () => {
  return (
    <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3 mt-22 text-accent">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-accent my-4 mt-10 relative inline-block">
          Terms & Conditions
        </h2>
        <p className="text-xl max-w-3xl mx-auto">
          Please read these terms carefully before using the OneMoreServe platform.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        <div className="lg:w-2/3 bg-base-200 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
          
          <div className="mb-8">
            <div className="flex items-start mb-4">
              <FaBalanceScale className="text-2xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Acceptance of Terms</h3>
                <p className="mb-4">
                  By accessing or using the OneMoreServe platform, you agree to be bound by these Terms. 
                  If you disagree with any part of the terms, you may not access the service.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-start mb-4">
              <FaShieldAlt className="text-2xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">User Responsibilities</h3>
                <p className="mb-4">
                  As a user of our platform, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate information about food donations</li>
                  <li>Ensure food safety standards are met</li>
                  <li>Not misuse the platform for commercial gain</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-start mb-4">
              <FaUserLock className="text-2xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Privacy Policy</h3>
                <p className="mb-4">
                  Your privacy is important to us. Please review our 
                  <Link to="/privacy" className="text-primary hover:underline ml-1">
                    Privacy Policy
                  </Link>, which explains how we collect, use, and protect your information.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start mb-4">
              <FaInfoCircle className="text-2xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Limitation of Liability</h3>
                <p className="mb-4">
                  OneMoreServe acts as a connector between food donors and charities. 
                  We are not responsible for the quality or safety of donated food items. 
                  All parties must exercise their own judgment when accepting or distributing food.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <div className="bg-base-200 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Key Points</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                <span>Platform is for non-commercial use only</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                <span>We may update these terms periodically</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                <span>Users must be 18+ or have guardian consent</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</span>
                <span>We reserve the right to terminate accounts for violations</span>
              </li>
            </ul>
          </div>

          <div className="bg-base-200 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-primary font-medium">legal@onemoreserve.org</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;