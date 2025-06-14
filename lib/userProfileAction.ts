import { sanityClient } from '@/lib/sanityClient';
import { UserProfileType } from '@/types/Types';

export async function upsertUserProfile(data: UserProfileType) {
  const existing = await sanityClient.fetch(
    `*[_type == "userProfile" && email == $email][0]`,
    {
      email: data.email
    }
  );

  if (existing) {
    return sanityClient.patch(existing._id).set(data).commit();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _type, ...dataWithoutType } = data;
    return sanityClient.create({ _type: 'userProfile', ...dataWithoutType });
  }
}

export async function fetchUserProfile(email: string) {
  return sanityClient.fetch(`*[_type == "userProfile" && email == $email][0]`, {
    email
  });
}
