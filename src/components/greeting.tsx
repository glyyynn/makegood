import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export const Greeting = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h2>Welcome, Guest!</h2>
        <p>Please sign in to access more features.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome back {session.user?.name}!</h1>
    </div>
  );
};
