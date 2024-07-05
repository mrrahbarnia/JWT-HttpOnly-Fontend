"use client"
import Link from 'next/link';

import classes from './Header.module.css';
import { usePathname } from 'next/navigation';

const Header = () => {
    const path = usePathname();

    return (
        <header className={classes.header}>
            <Link className={path === '/' ? classes['active-a'] : classes.a } href='/'>Home</Link>
            <Link className={path === '/login' ? classes['active-a'] : classes.a } href='/login'>Login</Link>
            <Link className={path === '/register' ? classes['active-a'] : classes.a } href='/register'>Register</Link>
            <Link className={path === '/transactions' ? classes['active-a'] : classes.a } href='/transactions'>Transactions</Link>
        </header>
    )
};

export default Header;