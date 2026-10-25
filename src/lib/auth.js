import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';
import { getDb } from './mongodb';

let _auth;

// Lazy so `next build` works without env vars being present.
export function getAuth() {
  if (_auth) return _auth;

  const hasGoogle = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

  _auth = betterAuth({
    database: mongodbAdapter(getDb()),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: { enabled: true, minPasswordLength: 8 },
    socialProviders: hasGoogle
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            accessType: 'offline',
            prompt: 'select_account consent',
            scope: [
              'https://www.googleapis.com/auth/drive.file',
              'https://www.googleapis.com/auth/spreadsheets',
              'https://www.googleapis.com/auth/documents',
              'https://www.googleapis.com/auth/calendar.events',
            ],
          },
        }
      : {},
    plugins: [nextCookies()],
  });
  return _auth;
}

export async function getServerSession() {
  const { headers } = await import('next/headers');
  return getAuth().api.getSession({ headers: await headers() });
}
