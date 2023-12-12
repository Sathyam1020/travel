'use client'

// HomePage.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Trip {
  destination: string;
  startDate: string;
  endDate: string;
}


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

const CardComponet = () => {

    const [trips, setTrips] = useState<Trip[]>([]);
      

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = (indexToDelete: number) => {
    handleDelete(indexToDelete);
    closeModal();
  };

  
  const router = useRouter(); 

  const handleOnClick = () => {
    router.push('/trip'); 
  }

  const handleDelete = (index: number) => {
    const updatedTrips = [...trips];
    updatedTrips.splice(index, 1);
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
  };


  const handleFormSubmit = (newTrip: Trip) => {
    const randomImage = getRandomImage();
    const updatedTrips = [...trips, { ...newTrip, image: randomImage }];
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    localStorage.setItem(`image_${updatedTrips.length - 1}`, randomImage);
  };

  useEffect(() => {
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      setTrips(JSON.parse(storedTrips));
    }
  }, [setTrips]);

  return (
    <div className='w-full flex justify-center items-center flex-col mt-2 p-1'>
      <h1 className='text-4xl font-bold  text-[#f4593f] mb-3 px-7 py-2'>Your Trips</h1>
      {trips.length === 0 ? (
        <div className='mb-4'>
            <p className='text-[#f4593f] font-bold py-2 mb-4'>Create your first trip</p>
            <div
              className='flex gap-1 justify-between items-center rounded-md border-2 border-[#f4593f] px-4 py-2 hover:bg-slate-50 transition-all duration-200 cursor-pointer text-[#f4593f] font-semibold'
              onClick={handleOnClick}
            >
              <Plus />
              <h1>
                New Trip
              </h1>
            </div>
        </div>
      ) : (
        <div className="trip-cards">
          {trips.map((trip: Trip, index: number) => (
            <div key={index} className='flex items-center gap-5 border-[2px] border-[#f4593f] rounded-lg px-4 py-2 mb-4'>
                <div className="relative w-32 h-32 overflow-hidden rounded-lg">
                    <Image
                        src={getRandomImage()}
                        alt=''
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div  className="flex justify-start flex-col">
                    <h2 className='text-2xl text-gray-500 font-semibold'>{trip.destination}</h2>
                    <p className='py-1 '>
                        <strong>Start Date:</strong> {trip.startDate}
                    </p>
                    <p className='py-1'>
                        <strong>End Date:</strong> {trip.endDate}
                    </p>
                    <div className='flex justify-between items-center w-full mt-2 gap-2'>
                        <div onClick={openModal} className='px-4 py-2 mr-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md cursor-pointer'>
                            Delete
                        </div>
                        {isModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-4 rounded-md">
                                <p>Are you sure you want to delete this trip?</p>
                                <div className="flex justify-end mt-4">
                                    <button onClick={() => confirmDelete(index)} className="px-4 py-2 mr-2 bg-red-500 hover:bg-red-600 text-white rounded-md">Delete</button>
                                    <button onClick={closeModal} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md">Cancel</button>
                                </div>
                                </div>
                            </div>
                        )}
                        <Link href={`/`} className='px-4 py-2 font-semibold text-[#f4593f] rounded-md border-[1px] border-[#f4593f] '>More</Link>
                    </div>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardComponet;
