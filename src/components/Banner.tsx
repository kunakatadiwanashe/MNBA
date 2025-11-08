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
              className="w-full h-full abject-contain"
              src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1988934731672816%2F&show_text=true&width=264&t=0"
              title="MNBA Highlights"
              allow="autoplay; fullscreen"
            ></iframe>
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
