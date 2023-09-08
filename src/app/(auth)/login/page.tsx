import WrapperCentered from '@/components/wrapperCentered'
import Link from 'next/link'
import React from 'react'

const Login = () => {

    return (
        <WrapperCentered classes='shadow-xl shadow-gray-400 border rounded-lg sm:h-auto sm:w-[400px]'>
            <div className='flex flex-col justify-around items-center pt-5 pb-5'>
                <h1 className='text-center text-2xl'>Login Page</h1>
                <input type='email' className='h-[40px] shadow-gray-400 p-2 mt-3 mb-3 w-full border-non shadow rounded-lg' placeholder='Email'/>
                <input type='password' className='h-[40px] shadow-gray-400 p-2 mt-3 mb-3 w-full border-non shadow rounded-lg' placeholder='Password'/>
                <button className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow rounded-lg bg-slate-500 text-white'>Login</button>
                <Link href='/signup' className='text-blue-400'>if you want to Signup</Link>
            </div>
        </WrapperCentered>
    )
}

export default Login