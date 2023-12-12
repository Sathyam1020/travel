'use client'

import React from 'react'
import logo from "@/assets/logo.png"; 
import Image from 'next/image';
import Link from 'next/link';
import { Plus, SendToBack } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {

  const router = useRouter(); 
  const handleOnClick = () => {
    router.push('/trip');
  };

  const pathname = usePathname(); 

  const isHomePage = pathname === '/';

  return (
    <div>
        <div className='border-b border-gray-300 shadow-lg'>
            <nav className='flex mx-auto max-w-[1080px] justify-between px-2 py-1 m-1'>
                <Link href="/">
                <Image
                    src={logo}
                    alt="Logo of the company"
                    height={50}
                    width={50}
                />
                </Link>
                {isHomePage ? (
            <div
              className='flex gap-1 justify-between items-center rounded-md border-2 border-[#f4593f] px-4 py-2 hover:bg-slate-50 transition-all duration-200 cursor-pointer text-[#f4593f] font-semibold'
              onClick={handleOnClick}
            >
              <Plus />
              <h1>
                New Trip
              </h1>
            </div>
          ) : (
            <Link href="/">
              <div
                className='flex gap-1 justify-between items-center rounded-md border-2 border-[#f4593f] px-4 py-2 hover:bg-slate-50 transition-all duration-200 cursor-pointer text-[#f4593f] font-semibold'
              >
                <SendToBack />
                <h1>
                  Back to Home
                </h1>
              </div>
            </Link>
          )}

            </nav>
        </div>
    </div>
  )
}

export default Navbar; 