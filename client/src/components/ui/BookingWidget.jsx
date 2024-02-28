import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks';
import axiosInstance from '@/utils/axios';
import DatePickerWithRange from './DatePickerWithRange';

const BookingWidget = ({ place }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null, timeRange: { start: '09:00', end: '17:00' } });
  const [bookingData, setBookingData] = useState({
    noOfGuests: 1,
    name: '',
    phone: '',
  });
  const [redirect, setRedirect] = useState('');
  const { user } = useAuth();

  const { noOfGuests, name, phone } = bookingData;
  const { _id: id, price } = place;

  useEffect(() => {
    if (user) {
      setBookingData({ ...bookingData, name: user.name });
    }
  }, [user]);

  const numberOfNights = dateRange.from ? 1 : 0;

  // handle booking form
  const handleBookingData = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    // User must be signed in to book a place
    if (!user) {
      return setRedirect(`/login`);
    }

    // BOOKING DATA VALIDATION
    if (numberOfNights < 1) {
      return toast.error('Please select valid dates');
    } else if (noOfGuests < 1) {
      return toast.error("No. of guests can't be less than 1");
    } else if (noOfGuests > place.maxGuests) {
      return toast.error(`Allowed max. no. of guests: ${place.maxGuests}`);
    } else if (name.trim() === '') {
      return toast.error("Name can't be empty");
    } else if (phone.trim() === '') {
      return toast.error("Phone can't be empty");
    } else if (!dateRange.from) {
      return toast.error('Please select a valid date');
    }

    const checkInDateTime = new Date(dateRange.from);
    checkInDateTime.setHours(parseInt(dateRange.timeRange.start.split(':')[0], 10));
    checkInDateTime.setMinutes(parseInt(dateRange.timeRange.start.split(':')[1], 10));

    const checkOutDateTime = new Date(dateRange.to);
    checkOutDateTime.setHours(parseInt(dateRange.timeRange.end.split(':')[0], 10));
    checkOutDateTime.setMinutes(parseInt(dateRange.timeRange.end.split(':')[1], 10));

    try {
      const response = await axiosInstance.post('/bookings', {
        checkIn: checkInDateTime,
        checkOut: checkOutDateTime,
        noOfGuests,
        name,
        phone,
        place: id,
        price: price, // Price is not multiplied by numberOfNights for single date
      });

      const bookingId = response.data.booking._id;

      setRedirect(`/account/bookings/${bookingId}`);
      toast('Congratulations! Enjoy your trip.');
    } catch (error) {
      toast.error('Something went wrong!');
      console.log('Error: ', error);
    }
  };


  const initPayment = (data) => {
    const options = {
      key: "rzp_test_9N4JeqBFcl3a6A",
      amount: data.amount * 100,
      currency: 'INR',
      name: 'CafeHolic',
      description: 'Payment for booking',
      image: '/favicon.ico',
      order_id: data.id,
      phone: phone,
      handler: async function (response) {
        try {
          const verified = await axiosInstance.post('/payment/verify', {
            orderCreationId: data.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
          console.log(verified.data);

          handleBooking();
        } catch (error) {
          console.log(error);
        }
      },
      prefill: {
        name,
        email: user.email,
        contact: phone,
      },
      theme: {
        color: '#61dafb',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const response = await axiosInstance.post('/payment/order', {
        amount: numberOfNights * place.price,
        currency: 'INR',
        receipt: 'order_rcptid_11',
      });
      console.log(response.data);
      initPayment(response.data);
    } catch (error) {
      console.log(error);
    }

  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-xl">
      <div className="text-center text-xl">
        Price: <span className="font-semibold">₹{place.price}</span> / per booking
      </div>
      <div className="mt-4 rounded-2xl border">
        <div className="flex justify-center items-center w-full ">
          <DatePickerWithRange setDateRange={setDateRange} />
        </div>
        <div className="border-t py-3 px-4">
          <label>Number of guests: </label>
          <input
            type="number"
            name="noOfGuests"
            placeholder={`Max. guests: ${place.maxGuests}`}
            min={1}
            max={place.maxGuests}
            value={noOfGuests}
            onChange={handleBookingData}
          />
        </div>
        <div className="border-t py-3 px-4">
          <label>Your full name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleBookingData}
          />
          <label>Phone number: </label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleBookingData}
          />
        </div>
      </div>
      <button onClick={handlePayment} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
