"use client"
import Link from 'next/link';
import classes from './Header.module.css';

import { usePathname } from 'next/navigation';
import { useAuth } from '../authProvider';

const LOGOUT_URL = '/api/logout';

const Header = () => {
    const auth = useAuth();
    const path = usePathname();

    const LogoutHandler = async() => {
        const response = await fetch(LOGOUT_URL);
        if (response.ok) {
            auth.logout();
        }
    }

    return (
        <header className={classes.header}>
            <Link className={path === '/' ? classes['active-a'] : classes.a } href='/'>Home</Link>
            {auth.isAuthenticated && <a style={{cursor: 'pointer'}} onClick={LogoutHandler}>Logout</a>}
            {!auth.isAuthenticated && <Link className={path === '/login' ? classes['active-a'] : classes.a } href='/login'>Login</Link>}
            {!auth.isAuthenticated && <Link className={path === '/register' ? classes['active-a'] : classes.a } href='/register'>Register</Link>}
            {auth.isAuthenticated && <Link className={path === '/transactions' ? classes['active-a'] : classes.a } href='/transactions'>Transactions</Link>}
        </header>
    )
};

export default Header;