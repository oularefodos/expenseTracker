'use client'

import WrapperCentered from '@/app/(front-end)/components/wrapperCentered';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Index = () => {
    const router = useRouter();
    const params = useSearchParams();
    const token = params.get('token');
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const verifyToken = async () => {
        if (!token) {
            return ;
        }
        try {
            setIsLoading(true);
            const response = await fetch(`/api/validateEmail`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({ token : token})
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error.message)
            }
            const data = await response.json();
            setIsVerified(true);
            setIsError(false);
            router.push('/login');
        }
        catch (error) {
            setIsError(true);
            setIsVerified(false);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        verifyToken();
    }, [])

    const ResetCode = async () => {
        try {
            if (email === '') {
                return ;
            }
            setIsLoading(true);
            const response = await fetch(`/api/sendEmailValidator`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({ email : email})
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error.message)
            }
            const data = await response.json();
            setEmail('');
        }
        catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <WrapperCentered classes='h-full  md:h-[500px] max-w-[300px]'>
            <div className='text-center'>
                {
                    isVerified
                    &&
                    (
                    <div>
                        <p className='text-green-400'>Your Token is Verfield</p>
                    </div>
                    )
                }
                {
                    isError
                    &&
                    <div>
                        <p className='text-red-400'>Verification faild</p>
                        <input 
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow shadow-gray-400 rounded-lg' 
                            placeholder='Email'
                        />
                        <button 
                            onClick={ResetCode}
                            className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow rounded-lg bg-red-500 text-white'>
                            {
                                isLoading ? 'process...' : 'Resend the main'
                            }
                        </button>
                    </div>
                }
            </div>
        </WrapperCentered>
    )
}

export default Index