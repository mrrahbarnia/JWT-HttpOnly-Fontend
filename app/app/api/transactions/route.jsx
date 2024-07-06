"use server"
import { NextResponse } from "next/server";

import ApiProxy from "../proxy";

const DJANGO_TRANSACTIONS_URL = 'http://127.0.0.1:8000/transactions/';

export async function GET (request) {
    const {data, status} = await ApiProxy.get(DJANGO_TRANSACTIONS_URL, true);

    return NextResponse.json(data, {status: status});
}