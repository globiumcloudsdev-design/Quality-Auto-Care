
import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import BookingForm from '../BookingForm';

const Booking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Your Detailing Service</h1>
              <p className="text-gray-600">
                Fill out the form below to schedule your appointment. We&apos;ll bring our professional
                detailing services right to your location.
              </p>
            </div>
            
            <BookingForm />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Booking;
