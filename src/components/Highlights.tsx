'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Headlines() {
  const headlines = [
    {
      id: 1,
      title: "🏀 Thank You, Mr. Brighton Musaidzi – A Slam Dunk Leadership Start!",
      content: `Victoria Falls and Sports Corban extends heartfelt appreciation to the
      newly elected Matabeleland North Basketball Association President,
      Mr. Brighton John Musaidzi, for successfully organizing the
      Victoria Falls Invitational Basketball Tournament held on 26–27 September 2025.

      The event brought together the region’s most talented teams,
      showcasing thrilling matches, incredible sportsmanship, and vibrant community
      energy — a powerful statement about basketball’s growth in Mat North.
 
      Your commitment to growing basketball in our province is already making
      an impact. We look forward to more events, more energy, and more hoops action! 
      #VicFallsBasketball2025 #MatNorthHoops
      
      `,
    },
    {
      id: 2,
      title: "🏀 Sun's Festival",
      content: `Get ready for some hoops action! 🎉🏀 Sun's Festival is hosting a 3x3 tournament, 3-point contest, and 1-on-1 tournament (King of The court) for men and women of all ages! 🤩 Join us for a day of fun, competition, and community! 🌞

To participate, WhatsApp, call, or text [contact info]. Don't miss out on the excitement! 📲 See you there! 🏀

Register Now`,
    },
    {
      id: 3,
      title: "🍎 Fruit Hamper of Appreciation",
      content: `Though we may not have much, we present a small token of appreciation —
      a fruit hamper sponsored by Vic Falls Fruits and Veggies, thanking Mr. Musaidzi
      for his dedication and leadership.`,
    },
    {
      id: 4,
      title: "🚀 Looking Ahead",
      content: `Your commitment to growing basketball in our province is already making
      an impact. We look forward to more events, more energy, and more hoops action! 
      #VicFallsBasketball2025 #MatNorthHoops`,
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % headlines.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [headlines.length]);

  return (
    <aside className="bg-white rounded-lg shadow-sm p-4 w-full lg:w-full md:h-[65vh] relative overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">HEADLINES</h3>

      </div>

      <div className="text-[13px] text-gray-700 min-h-[240px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={headlines[current].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-0 w-full"
          >
            <h4 className="font-semibold mb-2 text-gray-800">
              {headlines[current].title}
            </h4>
            <p className="leading-relaxed text-gray-600 whitespace-pre-line">
              {headlines[current].content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots for navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {headlines.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === current ? "bg-blue-500 w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </aside>
  );
}
