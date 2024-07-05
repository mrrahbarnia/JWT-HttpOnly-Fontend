"use server"

import { NextResponse } from "next/server"
import { setToken, setRefreshToken } from "@/lib/auth";

const DJANGO_LOGIN_URL = 'http://127.0.0.1:8000/users/login/'

export async function POST (request) {
    const data = await request.json();
    const response = await fetch(DJANGO_LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const jsonData = await response.json();
    if (response.status === 200) {
        setToken(jsonData?.access);
        setRefreshToken(jsonData?.refresh);
        return NextResponse.json({loggedIn: true}, {status: 200})
    }
    return NextResponse.json({loggedIn: false, ...jsonData}, {status: 400})
}
