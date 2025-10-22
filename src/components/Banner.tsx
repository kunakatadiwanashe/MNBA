'use client';

import React from 'react';
import Highlights from './Highlights';

export default function Banner() {




  return (
     <div className="bg-gray-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-6 px-4">
        
        {/* Left Section (Hero Video) */}
        <div className="relative flex-1 rounded-lg overflow-hidden bg-black text-white min-h-[300px] sm:min-h-[400px] lg:h-[500px]">
          {/* YouTube Video */}
          <div className="absolute inset-0">
            <iframe
              id="hero-video"
              className="w-full h-full"
              src="https://www.youtube.com/embed/64_-dnTKD38?rel=0"
              title="MNBA Highlights"
              allow="autoplay; fullscreen"
            ></iframe>
            {/* <div className="absolute inset-0 bg-black/50" /> */}
          </div>

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 h-[100px] bg-black/50 flex flex-col justify-center px-4 sm:px-8 py-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 leading-tight">
              TEAM PREVIEW
            </h2>
            <p className="text-xs sm:text-sm md:text-base mb-2 max-w-lg">
              Get ready for the 2025-26 MNBA season with 8 team previews featuring key questions, X-factors & more before camps open.
            </p>

          </div>

        </div>

        {/* Right Section (Headlines) */}
        <aside className="w-full lg:w-[35%]">
          <Highlights />
        </aside>
      </div>
    </div>
 
  );
}
