'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logout = () => {

    const router = useRouter();

    const logout = async () => {
        try {
            const response = await fetch(`/api/users/logout`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error.message)
            }
            const data = await response.json();
            console.log(data)
            router.push('/login');
        }
        catch (error) {
          console.log(error)
        }
    }

    return <button onClick={logout} className='p-2 min-w-[100px] border  rounded-lg shadow-sm text-white hover:bg-white hover:text-black'>logout</button>
}

export default Logout;