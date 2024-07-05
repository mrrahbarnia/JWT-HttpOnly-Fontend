"use client"

import { createContext, useState, useContext, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(null);

const LOGIN_DEFAULT_REDIRECT = '/';
const LOCAL_STORAGE_KEY = 'is-logged-in';

export const AuthProvider = ({children}) => {
    const queryParams = useSearchParams();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const localKey = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localKey) {
            const localKeyInt = parseInt(localKey);
            setIsAuthenticated(localKeyInt === 1);
        }
    }, [])

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, '1');

        const nextParam = queryParams.get('next');
        const inValidUrls = ['/login']
        const validNextUrl = nextParam && nextParam.startsWith('/') && !inValidUrls.includes(nextParam)
        if (validNextUrl) {
            router.replace(nextParam);
        } else {
            router.replace(LOGIN_DEFAULT_REDIRECT);
        }
    }

    return <AuthContext.Provider value={{isAuthenticated, login}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}