'use client';

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { upsertUserProfile, fetchUserProfile } from '@/lib/userProfileAction';
import { UserProfileType } from '@/types/Types';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileType>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });

  const [loading, setLoading] = useState(true);
  let fieldCount = 0;

  useEffect(() => {
    const loadProfile = async () => {
      const session = await getSession();
      if (!session?.user?.email) return;

      const existing = await fetchUserProfile(session.user.email);
      if (existing) setProfile(existing);
      else
        setProfile((prev) => ({ ...prev, email: session.user?.email ?? '' }));

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertUserProfile({ ...profile, _type: 'userProfile' });
    alert('Saved!');
  };

  if (loading) return <div className='p-10 text-center'>Loading...</div>;

  console.log('Profile data:', profile);

  return (
    <main className='max-w-xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-6'>Your Profile</h1>
      <form
        onSubmit={handleSave}
        className='space-y-4'>
        <label
          key={profile._id}
          className='block text-sm font-medium text-gray-700'>
          Email
        </label>
        <input
          key={profile.email}
          type='text'
          name={profile.email}
          value={profile.email ?? ''}
          placeholder={
            profile.email.charAt(0).toUpperCase() + profile.email.slice(1)
          }
          onChange={(e) =>
            setProfile((prev) => ({
              ...prev,
              [profile.email]: e.target.value
            }))
          }
          className='w-full p-2 border rounded'
        />

        {(
          Object.keys(profile).filter(
            (key) => !key.startsWith('_') && key !== 'email'
          ) as (keyof UserProfileType)[]
        ).map((field) => {
          console.log(`Rendering field: ${field}`, profile[field], fieldCount);

          return (
            <div key={(fieldCount = fieldCount + 1)}>
              <label className='block text-sm font-medium text-gray-700'>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                key={field}
                type='text'
                name={field}
                value={profile[field] ?? ''}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    [field]: e.target.value
                  }))
                }
                className='w-full p-2 border rounded'
                required={field !== 'phone'}
              />
            </div>
          );
        })}

        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
          Save Profile
        </button>
      </form>
    </main>
  );
}
