import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ResetPasswordForm from '@/components/reset-password-form';
import EditProfileForm from '@/components/edit-profile-form';

export default function ProfilePage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2 py-4">
      <h1 className="text-3xl font-semibold">Profile Information</h1>

      <div className="grid grid-cols-2 gap-6">
        <EditProfileForm />
        <ResetPasswordForm />
      </div>
    </div>
  );
}
