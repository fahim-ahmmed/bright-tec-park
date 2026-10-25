import { NextResponse } from 'next/server';
import { generateOrEditImage } from '@/server/geminiImageService';

export const runtime = 'nodejs';
export const maxDuration = 60;

const RATIOS = ['1:1', '16:9', '9:16', '4:3'];

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }
  const prompt = String(b.prompt || '').trim().slice(0, 1500);
  if (prompt.length < 3) return NextResponse.json({ success: false, error: 'প্রম্পট লিখুন।' }, { status: 400 });
  if (b.editImageBase64 && String(b.editImageBase64).length > 8_000_000) return NextResponse.json({ success: false, error: 'ছবিটি অনেক বড় (সর্বোচ্চ ~6MB)।' }, { status: 413 });
  try {
    const result = await generateOrEditImage({
      prompt, style: String(b.style || '').slice(0, 80),
      aspectRatio: RATIOS.includes(b.aspectRatio) ? b.aspectRatio : '1:1',
      action: b.action === 'edit' ? 'edit' : 'generate', editImageBase64: b.editImageBase64,
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, error: err?.message || 'Image generation failed' }, { status: 500 });
  }
}
