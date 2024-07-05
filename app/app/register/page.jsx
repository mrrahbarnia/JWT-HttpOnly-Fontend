"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import classes from './page.module.css';
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from '@/components/ui/Button';

const REGISTER_URL = 'api/register/'

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    const formSubmitHandler = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        const emailValue = event.target.email.value;
        const passwordValue = event.target.password.value;
        const confirmPasswordValue = event.target['confirm-password'].value;
        if ( emailValue === '' || passwordValue === '' || confirmPasswordValue === '') {
            setHasError('Fields must not be empty!');
            return;
        }
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
                confirm_password: confirmPasswordValue
            })
        })
        if (response.status === 201) {
            router.replace('/login');

        } else if (response.status === 409) {
            setHasError('Email must be unique!');
            setIsLoading(false);
            return;
        }
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
                <div className={classes['input-control']}>
                    <Input inputClassName={classes.input} 
                            labelClassName={classes.label} 
                            label='Confirm Password' 
                            name='confirm-password' 
                            type='password' 
                            placeHolder='Repeat your password' 
                        />
                </div>
                <div className={classes.actions}>
                    <Button text={isLoading ? 'Loading...' : 'Register'} />
                </div>
                {hasError && <span className={classes.error}>{hasError}</span>}
            </form>
        </Card>
    )
};

export default Page;