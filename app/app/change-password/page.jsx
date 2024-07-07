"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import classes from './page.module.css';
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from '@/components/ui/Button';
import { useAuth } from '@/components/authProvider';

const CHANGE_PASSWORD_URL = 'api/change-password/'

const Page = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    const formSubmitHandler = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        const oldPasswordValue = event.target['old-password'].value;
        const newPasswordValue = event.target['new-password'].value;
        const confirmPasswordValue = event.target['confirm-password'].value;
        if ( oldPasswordValue === '' || newPasswordValue === '' || confirmPasswordValue === '') {
            setHasError('Fields must not be empty!');
            setIsLoading(false);
            return;
        }
        if ( newPasswordValue !== confirmPasswordValue ) {
            setHasError('New passwords must be match!');
            setIsLoading(false);
            return;
        }
        const response = await fetch(CHANGE_PASSWORD_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                old_password: oldPasswordValue,
                new_password: newPasswordValue,
                confirm_password: confirmPasswordValue
            })
        })
        if (response.status === 200) {
            // router.replace('/login');
            auth.logout();
            return;

        } else if (response.status === 400) {

            const responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.new_password && responseJson.new_password[0] === 'Ensure this value has at least 8 characters (it has 7).') {
                setHasError('Ensure new password has at least 8 characters.');
                setIsLoading(false);
                return;
            }

            if (responseJson.message && responseJson.message === 'Old password is wrong!') {
                setHasError(responseJson.message);
                setIsLoading(false);
                return;
            }
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
                            label='Old password'
                            name='old-password'
                            type='password'
                            placeHolder='Enter your old password' 
                        />
                </div>
                <div className={classes['input-control']}>
                    <Input inputClassName={classes.input} 
                            labelClassName={classes.label} 
                            label='New password' 
                            name='new-password' 
                            type='password' 
                            placeHolder='Enter your new password' 
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
                    <Button text={isLoading ? 'Loading...' : 'Change password'} />
                </div>
                {hasError && <span className={classes.error}>{hasError}</span>}
            </form>
        </Card>
    )
};

export default Page;