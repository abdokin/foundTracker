import React from 'react';
import ResetPasswordForm from '@/components/reset-password-form';
import EditProfileForm from '@/components/edit-profile-form';
import { cookies } from 'next/headers';
import { User } from '@/lib/types';

export default function ProfilePage() {
  const user: User = JSON.parse(cookies().get("current_user")?.value!!);
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2 py-4">
      <div className="grid grid-cols-2 gap-6">
        <EditProfileForm user={user} />
        <ResetPasswordForm />
      </div>
    </div>
  );
}
