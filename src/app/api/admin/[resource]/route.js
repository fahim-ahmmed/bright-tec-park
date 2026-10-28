import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getAdmin } from '@/lib/admin-auth';
import { RESOURCES, escapeRe } from '@/lib/admin-resources';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (data, status = 200) => NextResponse.json(data, { status });
const DB_ERROR = 'ডেটাবেস সংযোগে সমস্যা হয়েছে। সার্ভার লগ দেখুন।';

export async function GET(req, { params }) {
  try {
    if (!(await getAdmin())) return json({ error: 'Unauthorized' }, 401);
    const { resource } = await params;
    const cfg = RESOURCES[resource];
    if (!cfg) return json({ error: 'Not found' }, 404);

    const sp = new URL(req.url).searchParams;
    const page = Math.max(1, parseInt(sp.get('page') || '1', 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(sp.get('limit') || '20', 10) || 20));
    const q = (sp.get('q') || '').trim().slice(0, 80);
    const filter = (sp.get('filter') || '').trim().slice(0, 40);

    const and = [];
    if (q) and.push({ $or: cfg.search.map((f) => ({ [f]: { $regex: escapeRe(q), $options: 'i' } })) });
    if (filter && cfg.filterField) and.push(cfg.filterQuery ? cfg.filterQuery(filter) : { [cfg.filterField]: filter });
    const query = and.length ? { $and: and } : {};

    const col = (await getDb()).collection(cfg.collection);
    const [rows, total] = await Promise.all([
      col.find(query).sort(cfg.sort).skip((page - 1) * limit).limit(limit).toArray(),
      col.countDocuments(query),
    ]);
    const items = rows.map(({ _id, ...r }) => ({ id: String(_id), ...r }));
    return json({ items, total, page, pages: Math.max(1, Math.ceil(total / limit)) });
  } catch (err) {
    console.error('admin list failed:', err);
    return json({ error: DB_ERROR }, 500);
  }
}

export async function POST(req, { params }) {
  try {
    if (!(await getAdmin())) return json({ error: 'Unauthorized' }, 401);
    const { resource } = await params;
    const cfg = RESOURCES[resource];
    if (!cfg) return json({ error: 'Not found' }, 404);
    if (!cfg.create) return json({ error: 'Not allowed' }, 405);

    let body;
    try { body = await req.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

    const db = await getDb();
    const { doc, error } = await cfg.create(body, db);
    if (error) return json({ error }, 400);
    const r = await db.collection(cfg.collection).insertOne({ ...doc, createdAt: new Date().toISOString() });
    return json({ success: true, id: String(r.insertedId) });
  } catch (err) {
    console.error('admin create failed:', err);
    return json({ error: DB_ERROR }, 500);
  }
}