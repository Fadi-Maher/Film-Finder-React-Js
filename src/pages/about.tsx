import React from 'react';
import myImg from '../assets/WhatsApp Image 2024-08-21 at 12.12.01 PM.jpeg'
const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-100 py-10 px-4 md:px-20 lg:px-40">
     
      <div className="text-center mb-8">
        
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800">About Us</h1>
        <p className="text-gray-600 mt-4">
          Discover who we are and what drives our passion for excellence.
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       
        <div>
          <h2 className="text-2xl font-semibold text-blue-700">Our Mission</h2>
          <p className="text-gray-700 mt-4">
            Our mission is to deliver top-quality services and products to our customers, ensuring satisfaction and value. We strive to be at the forefront of innovation and to continuously improve in all that we do.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-6">Our Vision</h2>
          <p className="text-gray-700 mt-4">
            We envision a world where our solutions empower people and businesses to reach their full potential, making a positive impact on society and the environment.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-6">Our Team</h2>
          <p className="text-gray-700 mt-4">
            Our team is composed of dedicated professionals who share a passion for excellence. Together, we work tirelessly to bring our vision to life and exceed the expectations of our clients.
          </p>
        </div>

        
        <div className="flex justify-center items-center rounded-full">
          <img
            src={myImg}
            alt="Our Team"
            className="rounded-full shadow-lg"
          />
        </div>
      </div>

     
      <div className="mt-10 text-center">
        <h3 className="text-xl font-medium text-blue-800">Get in Touch</h3>
        <p className="text-gray-600">
          Have questions or want to learn more about us? Feel free to{' '}
          <a href="/contact" className="text-blue-600 underline">
            contact us
          </a>.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
