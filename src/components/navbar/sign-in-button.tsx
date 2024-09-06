'use client';

import { useTransition } from 'react';
import { signIn } from 'next-auth/react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import * as m from '@/paraglide/messages';

export const SignInButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    console.log('checking sign in');

    console.log(process.env.GITHUB_ID);
    console.log(process.env.GITHUB_SECRET);

    startTransition(async () => {
      await signIn('github');
    });
  };

  return (
    <Button onClick={handleSignIn} disabled={isPending}>
      {isPending && <Icons.loader className="mr-2 size-4 animate-spin" />}
      {m.sign_in()}
    </Button>
  );
};
