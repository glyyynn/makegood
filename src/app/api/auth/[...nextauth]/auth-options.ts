import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import prisma from '@/lib/prisma';
import { stripeServer } from '@/lib/stripe';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: (() => {
        const clientId = process.env.GITHUB_ID || '';
        console.log('GITHUB_ID:', clientId); // Log the GitHub Client ID
        return clientId;
      })(),
      clientSecret: (() => {
        const clientSecret = process.env.GITHUB_SECRET || '';
        console.log('GITHUB_SECRET:', clientSecret); // Log the GitHub Client Secret
        return clientSecret;
      })(),
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (!session.user) return session;

      session.user.id = user.id;
      session.user.stripeCustomerId = user.stripeCustomerId;
      session.user.isActive = user.isActive;

      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      if (!user.email || !user.name) return;

      await stripeServer.customers
        .create({
          email: user.email,
          name: user.name,
        })
        .then(async (customer) => {
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
};
