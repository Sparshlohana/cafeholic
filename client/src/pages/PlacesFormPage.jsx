import axiosInstance from '@/utils/axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';

import AccountNav from '@/components/ui/AccountNav';
import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 10,
    price: 500,
    categories: ''
  });

  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = formData;

  const isValidPlaceData = () => {
    if (title.trim() === '') {
      toast.error("Title can't be empty!");
      return false;
    } else if (address.trim() === '') {
      toast.error("Address can't be empty!");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error('Upload at least 5 photos!');
      return false;
    } else if (description.trim() === '') {
      toast.error("Description can't be empty!");
      return false;
    } else if (maxGuests < 1) {
      toast.error('At least one guests is required!');
      return false;
    } else if (maxGuests > 10) {
      toast.error("Max. guests can't be greater than 10");
      return false;
    }

    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;

    // If it's not a checkbox or not the 'categories' field, update 'formData' directly
    if (type !== 'checkbox' && name !== 'categories') {
      setFormData({ ...formData, [name]: value });
      return;
    }

    // If type is checkbox (perks)
    if (type === 'checkbox' && name === 'perks') {
      const currentPerks = [...formData.perks];
      let updatedPerks = [];

      // Check if the perk is already in perks array
      console.log(value);
      if (currentPerks.includes(value)) {
        updatedPerks = currentPerks.filter((perk) => perk !== value);
      } else {
        updatedPerks = [...currentPerks, value];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }

    // If 'categories' field, update based on the selected option
    if (name === 'categories') {
      setFormData({ ...formData, categories: value });
    }
  };


  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axiosInstance.get(`/cafe/${id}`).then((response) => {
      const { place } = response.data;
      // update the state of formData
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: place[key],
          }));
        }
      }

      // update photos state separately
      setAddedPhotos([...place.photos]);

      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="mt-4 text-2xl">{header}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </>
    );
  };

  console.log(formData);

  const savePlace = async (e) => {
    e.preventDefault();

    const formDataIsValid = isValidPlaceData();
    // console.log(isValidPlaceData());
    const placeData = { ...formData, addedPhotos };

    // Make API call only if formData is valid
    if (formDataIsValid) {
      if (id) {
        // update existing place
        const { data } = await axiosInstance.put('/cafe/update-place', {
          id,
          ...placeData,
        });
      } else {
        // new place
        const { data } = await axiosInstance.post(
          '/cafe/add-cafe',
          placeData,
        );
      }
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/account/cafe'} />;
  }

  const categoryOptions = [
    { value: 'Aesthetic Café', label: 'Aesthetic Café' },
    { value: 'Rooftop Café', label: 'Rooftop Café' },
    { value: 'Family Café', label: 'Family Café' },
    { value: 'Party Café', label: 'Party Café' },
    { value: 'Café for Work', label: 'Café for Work' },
    { value: 'Couple Café', label: 'Couple Café' },
    { value: 'Celebration Café', label: 'Celebration Café' },
    { value: 'Franchise Café', label: 'Franchise Café' },
    { value: 'Hidden Café', label: 'Hidden Café' },
    { value: 'Unique Café', label: 'Unique Café' },
    { value: 'Pocket friendly Café', label: 'Pocket friendly Café' },
    { value: 'Food focused Café', label: 'Food focused Café' },
  ];
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          'Title',
          'title for your place. Should be short and catchy as in advertisement',
        )}
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleFormData}
          placeholder="title, for example: My lovely apt"
        />

        {preInput('Address', 'address to this place')}
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleFormData}
          placeholder="address"
        />


        {preInput('Category', 'Select the category of your place')}

        <Select
          defaultValue={selectedOption}
          onChange={(selectedOption) => {
            setSelectedOption(selectedOption);
            handleFormData({ target: { name: 'categories', value: selectedOption.value, type: 'select' } });
          }}
          options={categoryOptions}
          className='mt-2'
        />

        {preInput('Photos', 'more = better')}

        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {preInput('Description', 'discription of the place')}
        <textarea
          value={description}
          name="description"
          onChange={handleFormData}
        />

        {preInput('Extra info', 'house rules, etc ')}
        <textarea
          value={extraInfo}
          name="extraInfo"
          onChange={handleFormData}
        />

        {preInput(
          'Number of guests & Price',
          // 'add check in and out times, remember to have some time window forcleaning the room between guests. '
          'Specify the maximum number of guests so that the client stays within the limit.',
        )}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Max no. of guests</h3>
            <input
              type="text"
              name="maxGuests"
              value={maxGuests}
              onChange={handleFormData}
              placeholder="1"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleFormData}
              placeholder="1"
            />
          </div>
        </div>
        <button className="mx-auto my-4 flex rounded-full bg-primary py-3 px-20 text-xl font-semibold text-white">
          Save
        </button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
