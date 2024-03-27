import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AccountNav from '@/components/ui/AccountNav';
import PlaceImg from '@/components/ui/PlaceImg';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role;

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const { data } = await axiosInstance.get('/user/all');
                setUsers(data.users);
                setLoading(false);
            } catch (error) {
                console.log('Error: ', error);
                setLoading(false);
            }
        };
        getAllUsers();
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="flex flex-col items-center">
            <AccountNav />
            <div>
                <div>
                    <h1 className="text-3xl font-semibold">User Details</h1>
                </div>
                
                {users?.length > 0 ? (
                    users?.map((users) => (
                        <div className='flex item-center gap-4 mt-5'>
                            <div className=''>
                                <img src={user?.picture} alt="s" width={75} className='mt-6 rounded-full object-cover'/>
                            </div>
                            <div className="grow py-3 pr-3">
                                <div className='flex item-center gap-4'>
                                    <p className='text-2xl'>Name: </p>
                                    <h2 className="md:text-2xl">{users?.name}</h2>
                                </div>
                                <div className="md:text-xl">
                                    <div className="border-t "></div>
                                    <div className='flex item-center gap-4'>
                                        <p className='text-2xl'>Email: </p>
                                        <h2 className="md:text-2xl">{user?.email}</h2>
                                    </div>
                                </div>
                                <div className="md:text-xl">
                                    <div className="border-t "></div>
                                    <div className='flex item-center gap-4'>
                                        <p className='text-2xl'>Role: </p>
                                        <h2 className="md:text-2xl">{user?.role}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="">
                        <div className="flex flex-col justify-start">
                            <h1 className="my-6 text-3xl font-semibold">Oops</h1>
                            <hr className="border border-gray-300" />
                            <h3 className="pt-6 text-2xl font-semibold">
                                No cafe found!
                            </h3>
                            <p>
                                Time to dust off you bags and start planning your next adventure
                            </p>
                            <Link to="/" className="my-4">
                                <div className="flex w-40 justify-center rounded-lg border border-black p-3 text-lg font-semibold hover:bg-gray-50">
                                    Start Searching
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
