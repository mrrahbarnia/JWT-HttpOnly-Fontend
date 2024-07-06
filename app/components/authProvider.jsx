"use client"

import { createContext, useState, useContext, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(null);

const LOGIN_DEFAULT_REDIRECT = '/';
const LOGIN_REQUIRED_REDIRECT = '/login';
const LOCAL_STORAGE_KEY = 'is-logged-in';
const LOGOUT_REDIRECT = '/login';

export const AuthProvider = ({children}) => {
    const path = usePathname();
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
        const inValidUrls = ['/login', ]
        const validNextUrl = nextParam && nextParam.startsWith('/') && !inValidUrls.includes(nextParam);
        if (validNextUrl) {
            router.replace(LOGIN_DEFAULT_REDIRECT); // Change it
            return;
        } else {
            router.replace(LOGIN_DEFAULT_REDIRECT);
        }
    }

    const loginRequiredRedirect = () => {
        setIsAuthenticated(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, "0");
        const nextLoginUrl = `${LOGIN_REQUIRED_REDIRECT}?next=${path}`
        router.replace(nextLoginUrl);
    }

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, "0");
        router.replace(LOGOUT_REDIRECT);
    }

    return <AuthContext.Provider value={{isAuthenticated, login, loginRequiredRedirect, logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}