"use server"

import { NextResponse } from "next/server"
import { deleteTokens } from "@/lib/auth";

export async function GET (request) {
    deleteTokens();

    return NextResponse.json({loggedOut: true}, {status: 200});
}