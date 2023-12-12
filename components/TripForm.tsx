// NewTripForm.js
'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z, object, string } from 'zod';

const tripSchema = object({
  destination: string().min(2).max(50),
  startDate: string().min(1).max(50),
  endDate: string().min(1).max(50),
});

const TripForm = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const router = useRouter();
  const [formErrors, setFormErrors] = useState({ destination: '', startDate: '', endDate: '' });


  // Array of image URLs
const randomImages = [
    'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1677343210638-5d3ce6ddbf85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1664361480872-6416aab14696?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1678294323723-bfc7d93586dc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVtcGxlc3xlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1564804955013-e02ad9516982?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVtcGxlc3xlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVuZ2FsdXJ1fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1616595286596-f0b561c76bc5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1ldHJvfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hpcHxlbnwwfHwwfHx8MA%3D%3D'
  ];
  
const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return randomImages[randomIndex];
};

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Validate the form data using Zod schema
      tripSchema.parse({ destination, startDate, endDate });
  
      // If validation passes, proceed with your logic
      const newTrip = { destination, startDate, endDate, image: getRandomImage()};
  
      // Get existing trips from localStorage
      const existingTripsString = localStorage.getItem('trips');
      const existingTrips = existingTripsString ? JSON.parse(existingTripsString) : [];
  
      // Update trips and save to localStorage
      const updatedTrips = [...existingTrips, newTrip];
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
  
      router.push('/'); // Redirect to the home page
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Provide initial state structure
        const fieldErrors: { destination: string; startDate: string; endDate: string } = {
          destination: '',
          startDate: '',
          endDate: '',
        };
  
        error.errors.forEach((err) => {
          // Use type assertion to inform TypeScript that err.path[0] is a valid key
          const key = err.path[0] as keyof typeof fieldErrors;
          fieldErrors[key] = err.message;
        });
  
        setFormErrors(fieldErrors);
      }
    }
  };

  return (
    <div className='max-w-[1080px] mx-auto mt-1 p-1 flex justify-center items-center flex-col'>
      <h1 className='text-4xl font-bold  text-[#f4593f] shadow-xl rounded-lg bg-white mb-3 px-7 py-2'>Create a New Trip</h1>
      <form onSubmit={handleFormSubmit} className='flex flex-col justify-center gap-2 mt-2 rounded-lg bg-white mb-3 py-2 px-4 shadow-xl '>
        <label className='text-[#f4593f] font-semibold text-lg'>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className='border-[#f4593f] border-[2px] rounded-lg outline-none p-1 m-1'
          />
        </label>
        {formErrors.destination && <span className='text-[#ed1010] font-bold text-sm'>{formErrors.destination}</span>}
        <br />
        <label className='text-[#f4593f] font-semibold text-lg'>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='border-[#f4593f] border-[2px] rounded-lg outline-none p-1 m-1'
          />
        </label>
        {formErrors.startDate && <span className='text-[#ed1010] font-bold text-sm'>{formErrors.startDate}</span>}
        <br />
        <label className='text-[#f4593f] font-semibold text-lg'>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='border-[#f4593f] border-[2px] rounded-lg outline-none p-1 m-1'
          />
        </label>
        {formErrors.endDate && <span className='text-[#ed1010] font-bold text-sm'>{formErrors.endDate}</span>}
        <br />
        <button 
            type="submit"
            className='w-full rounded-lg px-4 py-2 bg-[#f4593f] text-semibold text-lg text-white'
        >
            Create Trip
        </button>
      </form>
    </div>
  );
};

export default TripForm;
