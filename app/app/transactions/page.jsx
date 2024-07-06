"use client"

import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

import { useAuth } from '@/components/authProvider';
import { useEffect } from 'react';

const TRANSACTIONS_URL = '/api/transactions';

const Page = () => {
    const auth = useAuth();
    const { data, error, isLoading } = useSWR(TRANSACTIONS_URL, fetcher);
    
    useEffect(() => {
        if (error?.status === 401) {
            auth.loginRequiredRedirect();
        }
    }, [auth, error])

    if (error) return <div>Failed to load...</div>
    if (isLoading) return <div>Loading...</div>

    return <ul>{data.map(d => <li key={d.id}>{d.amount}</li>)}</ul>
};

export default Page;