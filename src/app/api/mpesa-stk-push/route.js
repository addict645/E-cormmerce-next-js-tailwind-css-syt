import { NextResponse } from 'next/server';

export async function POST(req) {
    const { totalAmount, phoneNumber } = await req.json();

    try {
        // Fetch the access token
        const accessToken = await getAccessToken();

        // Prepare the STK push request payload
        const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'; // Change to live URL when deploying
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        // Generate the Timestamp and Password
        const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14); // Format: YYYYMMDDHHMMSS
        const password = Buffer.from(
            `${process.env.NEXT_PUBLIC_MPESA_SHORTCODE}${process.env.NEXT_PUBLIC_MPESA_PASSKEY}${timestamp}`
        ).toString('base64');

        const body = JSON.stringify({
            BusinessShortCode: process.env.NEXT_PUBLIC_MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: totalAmount,
            PartyA: phoneNumber, // Customer's phone number
            PartyB: process.env.NEXT_PUBLIC_MPESA_SHORTCODE,
            PhoneNumber: phoneNumber,
            CallBackURL: process.env.NEXT_PUBLIC_MPESA_CALLBACK_URL,
            AccountReference: 'Order123', // Customize as needed
            TransactionDesc: 'Payment for Order'
        });

        // Initiate the STK push request
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errorMessage || 'Failed to initiate payment');
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in /api/mpesa-stk-push:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Function to get the access token
async function getAccessToken() {
    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_MPESA_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_MPESA_CONSUMER_SECRET}`).toString('base64');
    const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    return data.access_token;
}
