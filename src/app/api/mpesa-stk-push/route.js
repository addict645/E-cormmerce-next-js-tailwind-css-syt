import { NextResponse } from 'next/server';

export async function POST(req) {
    const { totalAmount, phoneNumber } = await req.json();

    // Fetch the access token
    const accessToken = await getAccessToken();

    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'; // Change to live URL when deploying
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
        BusinessShortCode: process.env.NEXT_PUBLIC_MPESA_SHORTCODE,
        Password: process.env.NEXT_PUBLIC_MPESA_PASSWORD,
        Timestamp: new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14), // Format: YYYYMMDDHHMMSS
        TransactionType: 'CustomerPayBillOnline',
        Amount: totalAmount,
        PartyA: phoneNumber, // Customer's phone number
        PartyB: process.env.NEXT_PUBLIC_MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.NEXT_PUBLIC_MPESA_CALLBACK_URL,
        AccountReference: 'Order123', // Customize as needed
        TransactionDesc: 'Payment for Order'
    });

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body
    });

    const data = await response.json();
    return NextResponse.json(data);
}

async function getAccessToken() {
    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_MPESA_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_MPESA_CONSUMER_SECRET}`).toString('base64');
    const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`
        }
    });
    const data = await response.json();
    return data.access_token;
}
