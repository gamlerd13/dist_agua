import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const districts = await db.distrito.findMany();
    
    return NextResponse.json(districts);
  } catch (error) {
    console.error("Error getting districts:", error);
    return NextResponse.json({ error: "Error getting districts" }, { status: 500 });
  }
}