import NextAuth from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

const handler = async (req: any, res: any) => {
  // Log the environment variables
  console.log('GITHUB_ID:', process.env.GITHUB_ID); // Check if this is correctly loaded
  console.log('GITHUB_SECRET:', process.env.GITHUB_SECRET); // Check if this is correctly loaded

  // Proceed with NextAuth using authOptions
  return NextAuth(authOptions)(req, res);
};

// Export the handler for GET and POST methods
export { handler as GET, handler as POST };
