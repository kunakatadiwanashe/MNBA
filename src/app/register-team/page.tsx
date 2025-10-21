'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';

const teamSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  logo: z.string().min(1, 'Logo is required'),
  managerPic: z.string().min(1, 'Manager picture is required'),
  coachPic: z.string().min(1, 'Coach picture is required'),
  managerName: z.string().min(1, 'Manager name is required'),
  headCoach: z.string().min(1, 'Head Coach name is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email'),
  managerEmail: z.string().email('Invalid manager email'),
  managerPassword: z.string().min(6, 'Manager password must be at least 6 characters'),
  city: z.string().min(1, 'City is required'),
});

type TeamFormData = z.infer<typeof teamSchema>;

export default function RegisterTeam() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [managerUrl, setManagerUrl] = useState('');
  const [coachUrl, setCoachUrl] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'managerPic' | 'coachPic') => {
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

      if (field === 'logo') {
        setLogoUrl(data.url);
        setValue('logo', data.url);
      } else if (field === 'managerPic') {
        setManagerUrl(data.url);
        setValue('managerPic', data.url);
      } else if (field === 'coachPic') {
        setCoachUrl(data.url);
        setValue('coachPic', data.url);
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: TeamFormData) => {
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Team registered successfully!');
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(`Failed to register team: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
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
          <span className="text-sm text-gray-600 hidden sm:block">Powered by KunTech</span>


        </div>

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
            <span className='text-xl'>Matabeleland North Basketball League 🏀 Team Registration</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Team Name</label>
              <input
                {...register('name')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Logo</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, 'logo')}
                className="mt-1 block w-full"
              />
              {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={90}
                  height={45}
                  className="mt-2 w-20 h-20 object-cover rounded-md"
                />
              )}
              {errors.logo && <p className="text-red-500 text-sm">{errors.logo.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Manager Name</label>
              <input
                {...register('managerName')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.managerName && (
                <p className="text-red-500 text-sm">{errors.managerName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Manager Profile Pic</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, 'managerPic')}
                className="mt-1 block w-full"
              />
              {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
              {managerUrl && (
                <Image
                  src={managerUrl}
                  alt="Manager Profile Pic"
                  width={90}
                  height={45}
                  className="mt-2 w-20 h-20 object-cover rounded-md"
                />
              )}
              {errors.managerPic && <p className="text-red-500 text-sm">{errors.managerPic.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Manager Email (Login)</label>
              <input
                {...register('managerEmail')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.managerEmail && <p className="text-red-500 text-sm">{errors.managerEmail.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Manager Password</label>
              <input
                type="password"
                {...register('managerPassword')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.managerPassword && <p className="text-red-500 text-sm">{errors.managerPassword.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Head Coach</label>
              <input
                {...register('headCoach')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.headCoach && (
                <p className="text-red-500 text-sm">{errors.headCoach.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Head Coach Profile Pic</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, 'coachPic')}
                className="mt-1 block w-full"
              />
              {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
              {coachUrl && (
                <Image
                  src={coachUrl}
                  alt="Coach Profile Pic"
                  width={90}
                  height={45}
                  className="mt-2 w-20 h-20 object-cover rounded-md"
                />
              )}
              {errors.coachPic && <p className="text-red-500 text-sm">{errors.coachPic.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Club Phone</label>
              <input
                {...register('phone')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Club Email</label>
              <input
                {...register('email')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                {...register('city')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Register Team
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
