"use server"
import { NextResponse } from "next/server";

import ApiProxy from "../proxy";

const DJANGO_CHANGE_PASSWORD_URL = 'http://127.0.0.1:8000/users/change-password/';

export async function POST (request) {
    const requestData = await request.json();
    const {data, status} = await ApiProxy.post(DJANGO_CHANGE_PASSWORD_URL, requestData ,true);

    return NextResponse.json(data, {status: status});
}
