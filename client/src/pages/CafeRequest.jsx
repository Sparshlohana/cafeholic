import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AccountNav from '@/components/ui/AccountNav';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';

const CafeRequest = () => {
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCafes();
    }, []);

    const getCafes = async () => {
        try {
            const { data } = await axiosInstance.get('/cafe/requested-cafe');
            setCafes(data?.cafes);
            setLoading(false);
        } catch (error) {
            console.log('Error: ', error);
            setLoading(false);
        }
    };

    const handleApproval = async (id) => {
        try {
            await axiosInstance.put(`/cafe/approve/`, { approve: true, cafeId: id });
            getCafes();
        } catch (error) {
            console.log('Error approving cafe: ', error);
        }
    };


    const handleRejection = async (id) => {
        try {
            await axiosInstance.put(`/cafe/approve/`, { approve: false, cafeId: id });
            getCafes();
        } catch (error) {
            console.log('Error rejecting cafe: ', error);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="flex flex-col items-center">
            <AccountNav />
            <div>
                {cafes?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cafes.map((cafe) => (
                            <div key={cafe?._id} className="bg-white p-4 rounded-lg shadow-md">
                                {/* Display cafe information (title, address, photos, etc.) */}
                                <h2 className="text-xl font-semibold mt-2">{cafe?.title}</h2>
                                <p className="text-gray-500 mb-2">{cafe?.address}</p>
                                {/* Additional cafe details */}
                                {/* Approval and rejection buttons */}
                                <div className="flex mt-4">
                                    <button
                                        onClick={() => handleApproval(cafe?._id)}
                                        className="bg-green-500 text-white px-4 py-2 mr-2 rounded-lg hover:bg-green-600"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleRejection(cafe?._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-start">
                        <h1 className="my-6 text-3xl font-semibold">Oops</h1>
                        <hr className="border border-gray-300" />
                        <h3 className="pt-6 text-2xl font-semibold">
                            No Cafe found!
                        </h3>
                        <p>
                            Time to dust off your bags and start planning your next adventure
                        </p>
                        <Link to="/" className="my-4">
                            <div className="flex w-40 justify-center rounded-lg border border-black p-3 text-lg font-semibold hover:bg-gray-50">
                                Start Searching
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div >
    );
};


export default CafeRequest;
