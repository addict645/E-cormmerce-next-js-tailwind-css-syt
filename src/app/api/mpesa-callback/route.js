// src/app/api/mpesa-callback.js
import { NextResponse } from 'next/server';

export async function POST(req) {
    const data = await req.json();

    // Handle the callback data here
    console.log('M-Pesa Callback Data:', data);

    // You might want to process the data and update your order status
    // Save data to your database, send notifications, etc.

    return NextResponse.json({ status: 'success' });
}
