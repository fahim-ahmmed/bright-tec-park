import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getAdmin } from '@/lib/admin-auth';
import { RESOURCES, toId } from '@/lib/admin-resources';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (data, status = 200) => NextResponse.json(data, { status });

export async function PATCH(req, { params }) {
  if (!(await getAdmin())) return json({ error: 'Unauthorized' }, 401);
  const { resource, id } = await params;
  const cfg = RESOURCES[resource];
  const _id = toId(id);
  if (!cfg || !_id) return json({ error: 'Not found' }, 404);
  if (!cfg.update) return json({ error: 'Not allowed' }, 405);

  let body;
  try { body = await req.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const db = getDb();
  const col = db.collection(cfg.collection);
  const existing = await col.findOne({ _id });
  if (!existing) return json({ error: 'Not found' }, 404);

  const { doc, unset, error } = await cfg.update(body, db, existing);
  if (error) return json({ error }, 400);

  const op = { $set: { ...doc, updatedAt: new Date().toISOString() } };
  if (unset?.length) op.$unset = Object.fromEntries(unset.map((k) => [k, '']));
  await col.updateOne({ _id }, op);
  return json({ success: true });
}

export async function DELETE(_req, { params }) {
  if (!(await getAdmin())) return json({ error: 'Unauthorized' }, 401);
  const { resource, id } = await params;
  const cfg = RESOURCES[resource];
  const _id = toId(id);
  if (!cfg || !_id) return json({ error: 'Not found' }, 404);
  if (!cfg.remove) return json({ error: 'Not allowed' }, 405);
  await getDb().collection(cfg.collection).deleteOne({ _id });
  return json({ success: true });
}