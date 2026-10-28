import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'bci_admin';
const MAX_AGE = 60 * 60 * 8; // 8 hours

const secret = () => process.env.ADMIN_SESSION_SECRET || process.env.BETTER_AUTH_SECRET || '';
export const adminConfigured = () => Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && secret());

export const adminCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: MAX_AGE,
};

const sign = (payload) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
const sha = (v) => crypto.createHash('sha256').update(String(v)).digest();

export function createAdminToken(email) {
  const payload = Buffer.from(JSON.stringify({ e: email, exp: Date.now() + MAX_AGE * 1000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token) {
  if (!token || !secret()) return null;
  const [payload, sig] = String(token).split('.');
  if (!payload || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(payload));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!data.exp || data.exp < Date.now()) return null;
    return { email: data.e };
  } catch {
    return null;
  }
}

export function checkAdminCredentials(email, password) {
  if (!adminConfigured()) return false;
  const okEmail = crypto.timingSafeEqual(sha(String(email || '').trim().toLowerCase()), sha(process.env.ADMIN_EMAIL.trim().toLowerCase()));
  const okPass = crypto.timingSafeEqual(sha(password || ''), sha(process.env.ADMIN_PASSWORD));
  return okEmail && okPass;
}

// Works in server components and route handlers.
export async function getAdmin() {
  const store = await cookies();
  return verifyAdminToken(store.get(ADMIN_COOKIE)?.value);
}