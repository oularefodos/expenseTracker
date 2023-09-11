'use client';
import React, { useState } from 'react'
import WrapperCentered from '@/components/wrapperCentered'
import Link from 'next/link'
import { signupSchema } from '@/types/schema';
import { useRouter } from 'next/navigation';

const Signup = () => {

  const [state, setState] = useState({
    name : "",
    email : "",
    password : ""
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e : any) => {
    const {name, value} = e.target;
    setState({...state, [name] : value});
  };

  const SubmitData = async () => {
    try {
      setIsLoading(true);
      await signupSchema.validate(state);
      const response = await fetch(`/api/users/signup`, {
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
      const user = await response.json();
      router.push('/profile');
      console.log(user);
    }
    catch (error : any) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <WrapperCentered classes='shadow-xl shadow-gray-400 border rounded-lg sm:h-auto sm:w-[400px]'>
        <div className='flex flex-col justify-around items-center pt-5 pb-5'>
            <h1 className='text-center text-2xl'>Signup Page</h1>
            <input 
              type='text'
              name='name'
              value={state.name} 
              onChange={handleChange}
              className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow shadow-gray-400 rounded-lg' 
              placeholder='Name'
            />
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
            <Link href='/login' className='text-blue-400'>if you want to login</Link>
        </div>
    </WrapperCentered>
  )
}

export default Signup