'use client'
import WrapperCentered from '@/app/(front-end)/components/wrapperCentered'
import { User } from '@/types'
import React, { useEffect, useState } from 'react'
import Logout from '../../(auth)/logout'

const Profile = () => {

    const pages = ['expenses', 'add expenses', 'settigns']
    const [isActivated, setIsActivated] = useState<number>(0);
    const [user, setUser] = useState<User>();

    const getUser = async () => {
        try {
            const response = await fetch('/api/users/me');
            if (!response.ok) {
                throw(new Error('something goes wrong for user fetching'))
            };
            const data = await response.json();
            setUser(data.user);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <WrapperCentered classes='h-full w-full md:h-[500px] md:w-[500px]  border-2 shadow-lg shadow-gray-500'>
            <div className='w-full h-auto bg-red-400 bg-gradient-to-r text-white from-blue-500 to-blue-700 rounded-lg'>
                <div className='flex justify-around items-center p-4'>
                    <p>{user?.name}</p> 
                    <Logout />
                </div>
                <p className='text-center text-[30px]'>Balance</p>
                <p className='text-center text-[30px]'>{user?.balance} $</p>            
            </div>
            <div className='w-full pt-4'>
                <div className='w-full flex h-[40px] justify-around items-center'>
                    {/* {pages.map((name, index) => (
                        <p key={index} onClick={() => setIsActivated(index)} className={`p-1 block ${isActivated === index ? 'border-b-2' : ''} `}>{name}</p>
                    ))} */}
                </div>
            </div>
        </WrapperCentered>
    )
}

export default Profile