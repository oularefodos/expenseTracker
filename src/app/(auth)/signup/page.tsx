import React from 'react'
import WrapperCentered from '@/components/wrapperCentered'
import Link from 'next/link'

const Signup = () => {
  return (
    <WrapperCentered classes='shadow-xl shadow-gray-400 border rounded-lg sm:h-auto sm:w-[400px]'>
        <div className='flex flex-col justify-around items-center pt-5 pb-5'>
            <h1 className='text-center text-2xl'>Signup Page</h1>
            <input type='text' className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow shadow-gray-400 rounded-lg' placeholder='Name'/>
            <input type='email' className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow shadow-gray-400 rounded-lg' placeholder='Email'/>
            <input type='password' className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow shadow-gray-400 rounded-lg' placeholder='Password'/>
            <input type='password' className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow shadow-gray-400 rounded-lg' placeholder='ConfirmPassword'/>
            <button className='h-[40px] p-2 mt-3 mb-3 w-full border-non shadow rounded-lg bg-slate-500 text-white'>signup</button>
            <Link href='/login' className='text-blue-400'>if you want to login</Link>
        </div>
    </WrapperCentered>
  )
}

export default Signup