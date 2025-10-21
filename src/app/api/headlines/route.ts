import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Headline from '@/models/Headline';

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const { title, content } = await request.json();

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
        }

        const newHeadline = new Headline({
            title,
            content,
        });

        await newHeadline.save();

        return NextResponse.json({ message: 'Headline created successfully', headline: newHeadline }, { status: 201 });
    } catch (error) {
        console.error('Error creating headline:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDatabase();

        const headlines = await Headline.find().sort({ date: -1 });

        return NextResponse.json(headlines);
    } catch (error) {
        console.error('Error fetching headlines:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
