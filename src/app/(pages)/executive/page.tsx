'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BoardMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  level: number;
}

const boardMembers = [
  {
    name: 'Brighton John Musaidzi',
    role: 'Mat North Basketball Association President',
    image: 'https://res.cloudinary.com/dyikkz1ur/image/upload/v1761143659/bj-removebg-preview_nz8oa4.png',
    bio: 'Leading the club with vision, passion, and a commitment to excellence on and off the court.',
    level: 1,
  },
  {
    name: 'Brighton Musaidzi',
    role: 'Vice President',
    image: '/members/vice-president.jpg',
    bio: 'Supports club leadership and ensures smooth coordination between departments.',
    level: 2,
  },
  {
    name: 'Brighton Musaidzi',
    role: 'Secretary General',
    image: '/members/secretary.jpg',
    bio: 'Handles communication, records, and administrative coordination for the club.',
    level: 2,
  },
  {
    name: 'Brighton Musaidzi',
    role: 'Treasurer',
    image: '/members/treasurer.jpg',
    bio: 'Manages financial planning and ensures transparency in all financial matters.',
    level: 2,
  },
  {
    name: 'Leroy Phiri',
    role: 'Head Coach',
    image: '/members/head-coach.jpg',
    bio: 'Develops strategies, motivates players, and leads the team to victory.',
    level: 3,
  },
  {
    name: 'Ashley Dube',
    role: 'Assistant Coach',
    image: '/members/assistant-coach.jpg',
    bio: 'Assists in training sessions and tactical planning to strengthen team performance.',
    level: 3,
  },
  {
    name: 'Brian Chirwa',
    role: 'Team Manager',
    image: '/members/team-manager.jpg',
    bio: 'Coordinates logistics, player management, and ensures smooth operations during games.',
    level: 4,
  },
  {
    name: 'Lindiwe Ndlovu',
    role: 'Media Officer',
    image: '/members/media-officer.jpg',
    bio: 'Handles media relations, photography, and social media engagement for the club.',
    level: 4,
  },
  {
    name: 'Kelvin Banda',
    role: 'Physiotherapist',
    image: '/members/physiotherapist.jpg',
    bio: 'Ensures players stay fit, recover quickly, and maintain peak physical performance.',
    level: 4,
  },
  {
    name: 'Tinashe Mhlanga',
    role: 'Kit Manager',
    image: '/members/kit-manager.jpg',
    bio: 'Manages team kits, uniforms, and ensures players are game-ready at all times.',
    level: 4,
  },
];

// Helper: Group members by level
const groupByLevel = (members: BoardMember[]): Record<number, BoardMember[]> => {
  const grouped: Record<number, BoardMember[]> = {};
  members.forEach((m) => {
    if (!grouped[m.level]) grouped[m.level] = [];
    grouped[m.level].push(m);
  });
  return grouped;
};

export default function ExecutiveBoardPage() {
  const groupedMembers = groupByLevel(boardMembers);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Meet Our Executive Board
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          The dedicated leadership and support team driving our basketball club’s vision and success.
        </p>
      </motion.div>

      {/* Hierarchy Display */}
      <div className="space-y-16">
        {/* Level 1 - President */}
        {groupedMembers[1] && (
          <section className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wide">
              Leadership
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
              {groupedMembers[1].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-[var(--navbar-bg)] rounded-2xl shadow-lg hover:shadow-xl transition p-8 max-w-sm"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={40}
                    className="w-80 h-50  object-contain mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold capitalize">{member.name}</h3>
                  <p className="font-medium capitalize mt-1">{member.role}</p>
                  <p className="mt-3 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Level 2 - Executive Officers */}
        {groupedMembers[2] && (
          <section className="text-center bg-blue-50 rounded-3xl py-10 px-4 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-wide">
              Executive Officers
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {groupedMembers[2].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[var(--navbar-bg)] rounded-2xl shadow-md hover:shadow-lg transition p-6"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold capitalize">{member.name}</h3>
                  <p className=" font-medium capitalize mt-1">{member.role}</p>
                  <p className=" mt-3 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Level 3 - Coaching Staff */}
        {groupedMembers[3] && (
          <section className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-wide">
              Technical & Coaching Staff
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {groupedMembers[3].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 max-w-xs"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold capitalize">{member.name}</h3>
                  <p className="text-blue-600 font-medium capitalize mt-1">{member.role}</p>
                  <p className="text-gray-600 mt-3 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Level 4 - Support Staff */}
        {groupedMembers[4] && (
          <section className="text-center bg-gray-100 rounded-3xl py-10 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-wide">
              Support Staff
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-center">
              {groupedMembers[4].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold capitalize">{member.name}</h3>
                  <p className="text-blue-600 font-medium capitalize mt-1">{member.role}</p>
                  <p className="text-gray-600 mt-3 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
