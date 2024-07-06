"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/authProvider';

import classes from './page.module.css';
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from '@/components/ui/Button';

const LOGIN_URL = 'api/login/'

const Page = () => {
    const auth = useAuth();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    const formSubmitHandler = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        const emailValue = event.target.email.value;
        const passwordValue = event.target.password.value;
        if ( emailValue === '' || passwordValue === '' ) {
            setHasError('Fields must not be empty!');
            setIsLoading(false);
            return;
        }
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        })
        if (response.status === 200) {
            auth.login();
        } else if (response.status === 400) {
            setHasError('Not found active user!')
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
    }

    const cardClasses = hasError ? `${classes.card} ${classes['card-error']}` : classes.card;

    return (
        <Card className={cardClasses}>
            <form className={classes['form-control']} onSubmit={formSubmitHandler}>
                <div className={classes['input-control']}>
                    <Input inputClassName={classes.input}
                            labelClassName={classes.label}
                            label='Email'
                            name='email'
                            type='email'
                            placeHolder='Enter your email' 
                        />
                </div>
                <div className={classes['input-control']}>
                    <Input inputClassName={classes.input} 
                            labelClassName={classes.label} 
                            label='Password' 
                            name='password' 
                            type='password' 
                            placeHolder='Enter your password' 
                        />
                </div>
                <div className={classes.actions}>
                    <Button text={isLoading ? 'Loading...' : 'Login'} />
                </div>
                {hasError && <span className={classes.error}>{hasError}</span>}
            </form>
        </Card>
    )
};

export default Page;