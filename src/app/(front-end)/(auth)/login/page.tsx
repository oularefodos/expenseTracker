'use client'
import WrapperCentered from '@/app/(front-end)/components/wrapperCentered'
import { loginSchema } from '@/types/schema'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import React from 'react'

const Login = () => {
    const router = useRouter()
    const [state, setState] = useState({
        email : "",
        password : ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleChange = (e : any) => {
        const {name, value} = e.target;
        setState({...state, [name] : value});
    };

    const SubmitData = async () => {
        try {
          setIsLoading(true);
          await loginSchema.validate(state);
          const response = await fetch(`/api/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify(state)
          });
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error.message)
          }
          const data = await response.json();
          setState({password : '', email : ''});
          router.push('/profile');
        }
        catch (error) {
          console.log(error)
        }
        finally {
          setIsLoading(false);
        }
    }

    return (
        <WrapperCentered classes='shadow-xl shadow-gray-400 border rounded-lg sm:h-auto sm:w-[400px]'>
            <div className='flex flex-col justify-around items-center pt-5 pb-5'>
                <h1 className='text-center text-2xl'>Login Page</h1>
                <input 
                type='email'
                name='email'
                value={state.email} 
                onChange={handleChange}
                className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow shadow-gray-400 rounded-lg' 
                placeholder='Email'
                />
                <input 
                type='password'
                name='password'
                value={state.password}
                onChange={handleChange}
                className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow shadow-gray-400 rounded-lg' 
                placeholder='Password'
                />
                <button 
                onClick={SubmitData}
                className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow rounded-lg bg-slate-500 text-white'>
                {
                    isLoading ? "process...." : "send"
                }
                </button>
                <Link href='/signup' className='text-blue-400'>if you want to Signup</Link>
            </div>
        </WrapperCentered>
    )
}

export default Login