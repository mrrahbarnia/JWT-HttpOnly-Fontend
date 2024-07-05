"use server"

import { NextResponse } from "next/server"

const DJANGO_REGISTER_URL = 'http://127.0.0.1:8000/users/register/'

export async function POST (request) {
    const data = await request.json();
    const response = await fetch(DJANGO_REGISTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    if (response.status === 201) {
        return NextResponse.json({SignedUp: true}, {status: 201})
    } else if (response.status === 409) {
        return NextResponse.json({SignedUp: false}, {status: 409})
    }
}