'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FixturesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const teamLogos: Record<string, string> = {
    "Vic Falls Suns": "/logos/suns.png",
    "Royal Eagles": "/logos/eagles.png",
    "Hwange Basketball Club": "/logos/hwange.png",
    "Zimbabwe Open University": "/logos/zou.png",
    "Vic Falls Panthers": "/logos/panthers.png", // ❌ removed "/public" — it’s auto-handled
  };

  const fixtures = [
       { id: 1, date: "1 Nov 2025", venue: "Hwange Training Center", matches: [
      { home: "Vic Falls Suns", away: "Royal Eagles", time: "Game 1" },
      { home: "Hwange Basketball Club", away: "Zimbabwe Open University", time: "Game 2" },
    ], bye: "Vic Falls Panthers" },
    { id: 2, date: "8 Nov 2025", venue: "Chamabondo Primary School", matches: [
      { home: "Vic Falls Panthers", away: "Royal Eagles", time: "Game 1" },
      { home: "Hwange Basketball Club", away: "Vic Falls Suns", time: "Game 2" },
    ], bye: "Zimbabwe Open University" },
    { id: 3, date: "15 Nov 2025", venue: "Hwange Training Center", matches: [
      { home: "Zimbabwe Open University", away: "Vic Falls Panthers", time: "Game 1" },
      { home: "Hwange Basketball Club", away: "Royal Eagles", time: "Game 2" },
    ], bye: "Vic Falls Suns" },
    { id: 4, date: "22 Nov 2025", venue: "Chamabondo Primary School", matches: [
      { home: "Vic Falls Panthers", away: "Hwange Basketball Club", time: "Game 1" },
      { home: "Vic Falls Suns", away: "Zimbabwe Open University", time: "Game 2" },
    ], bye: "Royal Eagles" },
    { id: 5, date: "29 Nov 2025", venue: "Hwange Training Center", matches: [
      { home: "Vic Falls Suns", away: "Vic Falls Panthers", time: "Game 1" },
      { home: "Royal Eagles", away: "Zimbabwe Open University", time: "Game 2" },
    ], bye: "Hwange Basketball Club" },
    { id: 6, date: "6 Dec 2025", venue: "Chamabondo Primary School", matches: [
      { home: "Vic Falls Suns", away: "Royal Eagles", time: "Game 1" },
      { home: "Zimbabwe Open University", away: "Hwange Basketball Club", time: "Game 2" },
    ], bye: "Vic Falls Panthers" },
    { id: 7, date: "13 Dec 2025", venue: "Hwange Training Center", matches: [
      { home: "Vic Falls Panthers", away: "Royal Eagles", time: "Game 1" },
      { home: "Vic Falls Suns", away: "Hwange Basketball Club", time: "Game 2" },
    ], bye: "Zimbabwe Open University" },
    { id: 8, date: "20 Dec 2025", venue: "Chamabondo Primary School", matches: [
      { home: "Zimbabwe Open University", away: "Vic Falls Panthers", time: "Game 1" },
      { home: "Hwange Basketball Club", away: "Royal Eagles", time: "Game 2" },
    ], bye: "Vic Falls Suns" },
    { id: 9, date: "27 Dec 2025", venue: "—", matches: [
      { home: "NO GAMES (Cleared Weekend)", away: "", time: "" },
    ], bye: "" },
    { id: 10, date: "3 Jan 2026", venue: "Hwange Training Center", matches: [
      { home: "Hwange Basketball Club", away: "Vic Falls Panthers", time: "Game 1" },
      { home: "Vic Falls Suns", away: "Zimbabwe Open University", time: "Game 2" },
    ], bye: "Royal Eagles" },
    { id: 11, date: "10 Jan 2026", venue: "Chamabondo Primary School", matches: [
      { home: "Vic Falls Panthers", away: "Vic Falls Suns", time: "Game 1" },
      { home: "Royal Eagles", away: "Zimbabwe Open University", time: "Game 2" },
    ], bye: "Hwange Basketball Club" },
    { id: 12, date: "17 Jan 2026", venue: "Hwange Training Center", matches: [
      { home: "Vic Falls Suns", away: "Royal Eagles", time: "Game 1" },
      { home: "Hwange Basketball Club", away: "Zimbabwe Open University", time: "Game 2" },
    ], bye: "Vic Falls Panthers" },
    { id: 13, date: "24 Jan 2026", venue: "Chamabondo Primary School", matches: [
      { home: "Vic Falls Panthers", away: "Royal Eagles", time: "Game 1" },
      { home: "Vic Falls Suns", away: "Hwange Basketball Club", time: "Game 2" },
    ], bye: "Zimbabwe Open University" },
    { id: 14, date: "31 Jan 2026", venue: "Hwange Training Center", matches: [
      { home: "Vic Falls Panthers", away: "Zimbabwe Open University", time: "Game 1" },
      { home: "Royal Eagles", away: "Hwange Basketball Club", time: "Game 2" },
    ], bye: "Vic Falls Suns" },
    { id: 15, date: "7 Feb 2026", venue: "Chamabondo Primary School", matches: [
      { home: "Vic Falls Panthers", away: "Hwange Basketball Club", time: "Game 1" },
      { home: "Zimbabwe Open University", away: "Vic Falls Suns", time: "Game 2" },
    ], bye: "Royal Eagles" },
    { id: 16, date: "14 Feb 2026", venue: "Hwange Training Center", matches: [
      { home: "Vic Falls Panthers", away: "Vic Falls Suns", time: "Game 1" },
      { home: "Zimbabwe Open University", away: "Royal Eagles", time: "Game 2" },
    ], bye: "Royal Eagles (HOME-BYE)" },
    { id: 17, date: "21 Feb 2026", venue: "Chamabondo Primary School", matches: [
      { home: "Royal Eagles", away: "Vic Falls Suns", time: "Game 1" },
      { home: "Zimbabwe Open University", away: "Hwange Basketball Club", time: "Game 2" },
    ], bye: "Vic Falls Panthers" },
    { id: 18, date: "28 Feb 2026", venue: "Hwange Training Center", matches: [
      { home: "Royal Eagles", away: "Vic Falls Panthers", time: "Game 1" },
      { home: "Hwange Basketball Club", away: "Vic Falls Suns", time: "Game 2" },
    ], bye: "Zimbabwe Open University" },
    { id: 19, date: "7 Mar 2026", venue: "Chamabondo Primary School", matches: [
      { home: "Zimbabwe Open University", away: "Vic Falls Panthers", time: "Game 1" },
      { home: "Hwange Basketball Club", away: "Royal Eagles", time: "Game 2" },
    ], bye: "Vic Falls Suns" },
    { id: 20, date: "14 Mar 2026", venue: "Hwange Training Center", matches: [
      { home: "Hwange Basketball Club", away: "Vic Falls Panthers", time: "Game 1" },
      { home: "Vic Falls Suns", away: "Zimbabwe Open University", time: "Game 2" },
    ], bye: "Royal Eagles" },
    { id: 21, date: "21 Mar 2026", venue: "Chamabondo Primary School", matches: [
      { home: "Vic Falls Suns", away: "Vic Falls Panthers", time: "Game 1" },
      { home: "Royal Eagles", away: "Zimbabwe Open University", time: "Game 2" },
    ], bye: "Hwange Basketball Club" },
    { id: 22, date: "28 Mar 2026", venue: "Hwange Training Center", matches: [
      { home: "Vic Falls Suns", away: "Royal Eagles", time: "Game 1" },
      { home: "Hwange Basketball Club", away: "Zimbabwe Open University", time: "Game 2" },
    ], bye: "Vic Falls Panthers" },
    { id: 23, date: "4 Apr 2026", venue: "Chamabondo Primary School", matches: [
      { home: "Vic Falls Panthers", away: "Royal Eagles", time: "Game 1" },
      { home: "Vic Falls Suns", away: "Hwange Basketball Club", time: "Game 2" },
    ], bye: "Zimbabwe Open University" },
    { id: 24, date: "11 Apr 2026", venue: "Hwange Training Center", matches: [
      { home: "Vic Falls Panthers", away: "Zimbabwe Open University", time: "Game 1" },
      { home: "Royal Eagles", away: "Hwange Basketball Club", time: "Game 2" },
    ], bye: "Vic Falls Suns" },
    { id: 25, date: "18 Apr 2026", venue: "Chamabondo Primary School", matches: [
      { home: "Vic Falls Panthers", away: "Hwange Basketball Club", time: "Game 1" },
      { home: "Zimbabwe Open University", away: "Vic Falls Suns", time: "Game 2" },
    ], bye: "Royal Eagles" },
    { id: 26, date: "25 Apr 2026", venue: "Hwange Training Center", matches: [
      { home: "Vic Falls Panthers", away: "Vic Falls Suns", time: "Game 1" },
      { home: "Zimbabwe Open University", away: "Royal Eagles", time: "Game 2" },
    ], bye: "Zimbabwe Open University (HOME-BYE)" },
  ];
  

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#1565C0] flex items-center justify-between px-6 py-4 text-white">
        <h1 className="text-xl font-bold tracking-wide">🏀 MNBA</h1>
        <div className="flex space-x-6 text-sm font-semibold">
          <button className="border-b-2 border-white pb-1">GAMES</button>
          <button className="text-gray-200 hover:text-white">STANDINGS</button>
          <button className="text-gray-200 hover:text-white">PLAYERS</button>
        </div>
      </div>

      {/* Fixtures */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {fixtures.map((fixture, index) => (
          <motion.div
            key={fixture.id}
            layout
            className="bg-[#1E1E1E] rounded-md shadow-md mb-6 p-4"
          >
            {/* Fixture Header */}
            <div
              onClick={() => setExpanded(expanded === index ? null : index)}
              className="flex justify-between items-center cursor-pointer"
            >
              <div>
                <h2 className="text-lg font-bold text-white">{fixture.date}</h2>
                <p className="text-gray-400 text-sm">{fixture.venue}</p>
              </div>
              <motion.span
                animate={{ rotate: expanded === index ? 90 : 0 }}
                className="text-gray-300 text-xl"
              >
                ▶
              </motion.span>
            </div>

            {/* Always visible: logos + team names */}
            <div className="mt-3 space-y-2">
              {fixture.matches.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-800 last:border-none"
                >
                  {/* Home */}
                  <div className="flex items-center gap-2 w-1/3">
                    <img
                      src={teamLogos[m.home]}
                      alt={m.home}
                      className="w-6 h-6 object-contain"
                      onError={(e) => (e.currentTarget.src = "/logos/default.png")}
                    />
                    <span className="font-medium text-gray-200">{m.home}</span>
                  </div>

                  <span className="text-gray-400 text-xs sm:text-sm">vs</span>

                  {/* Away */}
                  <div className="flex items-center justify-end gap-2 w-1/3">
                    <span className="font-medium text-gray-200">{m.away}</span>
                    <img
                      src={teamLogos[m.away]}
                      alt={m.away}
                      className="w-6 h-6 object-contain"
                      onError={(e) => (e.currentTarget.src = "/logos/default.png")}
                    />
                  </div>

                  <div className="text-blue-400 text-sm font-semibold w-[80px] text-right">
                    {m.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Expand Section */}
            <AnimatePresence>
              {expanded === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 border-t border-gray-700 pt-3 text-center"
                >
                  {fixture.bye && (
                    <p className="text-xs text-gray-500">Bye: {fixture.bye}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
