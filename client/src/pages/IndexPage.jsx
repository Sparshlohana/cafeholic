import React, { useState } from 'react';
import { usePlaces } from '../../hooks';
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';
import { ImTree } from 'react-icons/im';
import { FaLaptopCode } from 'react-icons/fa';
import { IoMdWine } from 'react-icons/io';
import { MdAttachMoney, MdFastfood, MdOutlineFamilyRestroom, MdCake } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import { GiHidden, GiMineExplosion } from 'react-icons/gi';
import { BsCameraFill, BsFillArrowThroughHeartFill } from 'react-icons/bs';

const categories = [
  'Aesthetic Café',
  'Rooftop Café',
  'Party Café',
  'Café for Work',
  'Couple Café',
  'Hidden Café',
  'Pocket friendly Café',
  'Unique Café',
  'Food focused Café',
  'Family Café',
  'Celebration Café',
  'Franchise Café',
];

const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places, loading } = allPlaces;
  const [selectedFilter, setSelectedFilter] = useState(null);

  if (loading) {
    return <Spinner />;
  }

  const links = [
    { label: 'Aesthetic Café', imgSrc: <BsCameraFill /> },
    { label: 'Rooftop Café', imgSrc: <GiMineExplosion /> },
    { label: 'Party Café', imgSrc: <IoMdWine /> },
    { label: 'Café for Work', imgSrc: <FaLaptopCode /> },
    { label: 'Couple Café', imgSrc: <BsFillArrowThroughHeartFill /> },
    { label: 'Hidden Café', imgSrc: <GiHidden /> },
    { label: 'Pocket friendly Café', imgSrc: <MdAttachMoney /> },
    { label: 'Unique Café', imgSrc: <HiSparkles /> },
    { label: 'Food focused Café', imgSrc: <MdFastfood /> },
    { label: 'Family Café', imgSrc: <MdOutlineFamilyRestroom /> },
    { label: 'Celebration Café', imgSrc: <MdCake /> },
    { label: 'Franchise Café', imgSrc: <ImTree /> },
  ];

  const filteredPlaces = selectedFilter !== null
    ? places?.filter((place) => place?.category?.includes(categories[selectedFilter]))
    : places;


  return (
    <>
      <div className="flex mt-36 gap-5">
        {links.map((item, i) => (
          <div
            key={i}
            className={`links-box ${item.label === categories[selectedFilter] && 'selected-box'} cursor-pointer flex flex-col shadow justify-center items-center gap-1`}
            onClick={() => setSelectedFilter(i)}
          >
            {item.imgSrc}
            <p className={`links-label ${item.label === categories[selectedFilter] && 'selected-label'} text-center`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 py-32 justify-items-center px-4 md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10">
        {filteredPlaces?.length > 0 ? (
          filteredPlaces?.map((place) => <PlaceCard place={place} key={place._id} />)
        ) : (
          <div className="absolute left-1/3  right-1/2 top-72 flex w-full  transform flex-col p-10 md:w-1/2">
            <h1 className="text-3xl font-semibold">Result not found!</h1>
            <p className="text-lg font-semibold">
              Sorry, we couldn't find the place you're looking for.
            </p>
            <button className="mt-4 w-32 rounded-full bg-primary p-2 text-white">
              <a href="/" className="flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Go back
              </a>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default IndexPage;
