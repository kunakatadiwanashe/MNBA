


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';

const playerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  position: z.enum(['Guard', 'Forward', 'Center']),
  jerseyNumber: z.number().min(1, 'Jersey number is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email'),
  profilePicture: z.string().min(1, 'Jersey number is required'),
  teamId: z.string().min(1, 'Team selection is required'),
});

type PlayerFormData = z.infer<typeof playerSchema>;

interface Team {
  _id: string;
  name: string;
}

export default function RegisterPlayer() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
  });

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(data => setTeams(data));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setProfileUrl(data.url);
      setValue('profilePicture', data.url);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: PlayerFormData) => {
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Player registered successfully!');
        router.push('/');
      } else {
        alert('Failed to register player');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Floating accent */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      {/* Navbar */}
      <header className="w-full bg-white shadow-sm py-3 px-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <Link href="https://kuntech.co.zw" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://res.cloudinary.com/dyikkz1ur/image/upload/v1739973643/blog/file_1739973642190.png"
              alt="KunTech Logo"
              width={90}
              height={45}
              className="object-contain hover:opacity-80 transition"
            />
          </Link>

        </div>
        <span className="text-sm text-gray-600 hidden sm:block">Sponsored by KunTech</span>
      </header>

      {/* Main Form Card */}
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
          <h1 className="flex items-center text-2xl md:text-3xl font-bold mb-6  text-gray-800">
            <Image
              src="https://res.cloudinary.com/dyikkz1ur/image/upload/v1759488643/IMG-20251003-WA0007_u0gn8l.jpg"
              alt="League Logo"
              width={90}
              height={45}
              className="object-contain hover:opacity-80 transition pr-2"
            />
            <span className='text-xl'>Matabeleland North Basketball League 🏀 Player Registration</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                {...register('fullName')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                {...register('dob')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Position</label>
              <select
                {...register('position')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Position</option>
                <option value="Guard">Guard</option>
                <option value="Forward">Forward</option>
                <option value="Center">Center</option>
              </select>
              {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Jersey Number</label>
              <input
                type="number"
                {...register('jerseyNumber', { valueAsNumber: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.jerseyNumber && <p className="text-red-500 text-sm">{errors.jerseyNumber.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                {...register('phone')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                {...register('email')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Profile Picture</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="mt-1 block w-full"
              />
              {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
              {profileUrl && <Image src={profileUrl} alt="Profile" width={90}
                height={45} className="mt-2 w-20 h-20 rounded-md object-cover" />}
            </div>

            <div>
              <label className="block text-sm font-medium">Team</label>
              <select
                {...register('teamId')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Team</option>
                {teams.map(team => (
                  <option key={team._id} value={team._id}>{team.name}</option>
                ))}
              </select>
              {errors.teamId && <p className="text-red-500 text-sm">{errors.teamId.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Register Player
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-6 flex flex-col items-center text-gray-600 text-sm relative z-10">
        <p className="mb-2">Sponsored by KunTech</p>
        <div className="flex items-center gap-6">

        </div>
      </footer>
    </div>
  );
}
