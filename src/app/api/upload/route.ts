import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received');

    // Log Cloudinary config status (without exposing secrets)
    console.log('Cloudinary config check:', {
      cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
      api_key: !!process.env.CLOUDINARY_API_KEY,
      api_secret: !!process.env.CLOUDINARY_API_SECRET,
    });

    // Check if Cloudinary is properly configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary environment variables are not set');
      return NextResponse.json({ error: "Cloudinary configuration missing" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('No file provided in form data');
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    console.log('Attempting Cloudinary upload...');
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "basketball-app",
      resource_type: "auto",
    });

    console.log('Upload successful:', uploadResponse.secure_url);
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error('Upload error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ error: "Upload failed", details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
