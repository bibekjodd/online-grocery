'use client';

import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import Button from '../layouts/button';

export default function HeroBanner() {
  return (
    <div className="relative lg:h-[calc(100vh-5rem)]">
      <div
        className={`relative h-full bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url('/img-1.jpg')`
        }}
      >
        {/* content */}
        <div className="max-width section-padding-x relative z-20 flex h-full items-center py-20">
          <div className="">
            <h1 className="text-background text-white xl:text-6xl 2xl:text-7xl">
              Your One Stop Grocery Store
            </h1>
            <p className="font-lg mt-6 text-background text-white lg:max-w-lg 2xl:text-lg">
              Shop everything you need, from daily essentials to gourmet treats, all in one
              convenient place.
            </p>

            <Link className="mt-2 block" href="/products">
              <button className="bg-primary-700 bg-red-600 px-8 py-2 text-white hover:brightness-125">
                View Products
              </button>
            </Link>
          </div>
        </div>

        {/* black overlay */}
        <div className="absolute left-0 top-0 z-10 size-full bg-black/50"></div>
      </div>
    </div>
  );
}
