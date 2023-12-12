'use client'

import CardComponet from '@/components/CardComponent';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const YourComponent: React.FC = () => {

  return (
    <div>

      {/* Navbar  */}
      <Navbar />
      <div className='max-w-[1080px] mx-auto overflow-hidden flex gap-2 p-2 flex-col mt-4 lg:flex-row md:flex-row rouned-lg shadow-xl'>
        <div className='lg:w-[50%] w-full p-1 rounded-lg overflow-hidden'>
          <Image
              src="https://plus.unsplash.com/premium_photo-1661963357908-997d5429cec5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hpcHxlbnwwfHwwfHx8MA%3D%3D"
              alt='Image'
              width={800}
              height={800}
            />
        </div>
        <div className='lg:w-[50%] w-full flex items-center'>
          <h1 className='text-3xl lg:text-4xl font-light text-gray-500 p-1'>
          Discover Boundless Adventures: Tailor-made for You. Seamless planning, unforgettable journeys. Your story, our expertise. 
          </h1>
        </div>
      </div>
      <div className='max-w-[1080px] mx-auto shadow-xl rounded-lg '>
        <CardComponet />
      </div>
    </div>
  );
};

export default YourComponent;