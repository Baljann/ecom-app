import { put } from '@vercel/blob';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return new Response('No file uploaded', { status: 400 });

  const blob = await put(file.name, file, {
    access: 'public',
  });

  return Response.json(blob);
}
