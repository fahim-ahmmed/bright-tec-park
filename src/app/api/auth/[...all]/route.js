import { toNextJsHandler } from 'better-auth/next-js';
import { getAuth } from '@/lib/auth';

export const runtime = 'nodejs';

const configured = () => Boolean(process.env.MONGODB_URI && process.env.BETTER_AUTH_SECRET);

// Without MongoDB/secret configured the site still works: sessions are simply "signed out".
function notConfigured(req) {
  if (req.method === 'GET' && new URL(req.url).pathname.endsWith('/get-session')) return Response.json(null);
  return Response.json({ message: 'Auth is not configured. Set MONGODB_URI and BETTER_AUTH_SECRET in .env.local.' }, { status: 503 });
}

export async function GET(req) {
  if (!configured()) return notConfigured(req);
  return toNextJsHandler(getAuth()).GET(req);
}
export async function POST(req) {
  if (!configured()) return notConfigured(req);
  return toNextJsHandler(getAuth()).POST(req);
}
