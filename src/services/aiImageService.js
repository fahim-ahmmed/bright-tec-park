// The original aiImageService was not in the upload; rebuilt from how AiImageStudio used it.
export const STUDENT_IMAGE_PROMPTS = [
  { titleBn: 'আধুনিক কম্পিউটার ল্যাব', titleEn: 'Modern Computer Lab', prompt: 'Students collaborating in a high-tech computer lab with modern PCs and dual monitors in Kushtia, Bangladesh', style: 'modern-lab', aspectRatio: '16:9' },
  { titleBn: 'এআই ও কোডিং প্রজেক্ট', titleEn: 'AI & Coding Project', prompt: 'A student building an AI project, code on screen, glowing neural network visualization', style: 'cyber-neon', aspectRatio: '16:9' },
  { titleBn: 'ফ্রিল্যান্সিং ওয়ার্কস্পেস', titleEn: 'Freelancing Workspace', prompt: 'A young freelancer working on a laptop at a tidy desk, laptop showing a marketplace dashboard', style: 'modern-lab', aspectRatio: '4:3' },
  { titleBn: '৩ডি টেক আইকন', titleEn: '3D Tech Icon Set', prompt: 'Isometric 3D illustration of computer, shield and cloud icons for a training institute banner', style: '3d-render', aspectRatio: '1:1' },
  { titleBn: 'সাইবার সিকিউরিটি ব্যানার', titleEn: 'Cyber Security Banner', prompt: 'Cyber security concept banner, padlock, circuits and shield, emerald and cyan lights', style: 'cyber-neon', aspectRatio: '16:9' },
];

export async function requestGenerateImage({ prompt, aspectRatio, style, action, editImageBase64 }) {
  const res = await fetch('/api/gemini/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, aspectRatio, style, action, editImageBase64 }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { success: false, error: data.error || 'Image request failed' };
  return data;
}
