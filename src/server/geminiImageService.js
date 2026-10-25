import { GoogleGenAI } from '@google/genai';

const DIMS = { '1:1': [1024, 1024], '16:9': [1280, 720], '9:16': [720, 1280], '4:3': [1024, 768] };

function enhance(prompt, style) {
  let p = prompt.trim();
  const s = (style || '').toLowerCase();
  if (s.includes('modern lab')) p += ', modern high-tech computer training laboratory, dual screen workstations, clean professional educational campus, ultra-detailed, photorealistic 8k, architectural lighting';
  else if (s.includes('computer technology')) p += ', cutting-edge computer technology, glowing circuitry, digital programming interface, modern hardware and software setup, sharp focus, 8k resolution';
  else if (s.includes('ai') || s.includes('coding')) p += ', artificial intelligence and coding environment, futuristic data visualization, neon cyan and emerald accents, clean modern studio';
  else if (s.includes('cyber') || s.includes('neon')) p += ', glowing neon cyan and emerald lights, futuristic cyber aesthetics, volumetric lighting';
  else if (s.includes('3d') || s.includes('render')) p += ', 3D isometric digital art, Blender render, smooth textures, studio lighting';
  else p += ', ultra-detailed, photorealistic, 8k resolution, cinematic lighting, sharp focus';
  return p;
}

export async function generateOrEditImage({ prompt, aspectRatio = '1:1', style = 'photorealistic', action = 'generate', editImageBase64 }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const enhanced = enhance(prompt, style);
  const [width, height] = DIMS[aspectRatio] || DIMS['1:1'];

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      let contents = enhanced;
      if (action === 'edit' && editImageBase64 && editImageBase64.startsWith('data:image')) {
        const m = editImageBase64.match(/^data:(image\/\w+);base64,(.*)$/);
        if (m) contents = { parts: [{ inlineData: { data: m[2], mimeType: m[1] } }, { text: `Edit instruction: ${enhanced}` }] };
      }
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents,
        config: { imageConfig: { aspectRatio } },
      });
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          const url = `data:${mime};base64,${part.inlineData.data}`;
          return { success: true, imageUrl: url, mimeType: mime, engineUsed: 'gemini-3.1-flash-image-preview' };
        }
      }
    } catch (err) {
      console.warn('Gemini image generation failed, using fallback engine:', err?.message || err);
    }
  }

  // Fallback: free Pollinations (text-to-image only). Returned as a URL so the client downloads it itself.
  const seed = Math.floor(Math.random() * 9999999);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhanced)}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;
  return { success: true, imageUrl, engineUsed: 'free-ai-flux', note: action === 'edit' ? 'Editing needs GEMINI_API_KEY; generated a new image instead.' : undefined };
}
