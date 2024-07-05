
import Image from 'next/image';
import React from 'react';


//Cameron's part has been deleted as it not fit the page really well

//what I have done: basic structue of all the info and layout, modified the icon color in the public files

//need to do : 
//1. the font (we probs need to merge or pull the font from the main now, cuz now the main has the font info, 
//I asked Yunho and he said follow the config of tailswind. In only know that the figma fonts shows are same as the google fonts, it is the font we should use)
// 2. the size (I haven't check the size, I only checked the margin and padding,, should be done after finishing the font)
// 3. the color (I have finished all the color except the Blue part (just not sure if we have to be standars on this part)

//4. due to the different state (bidding or expired), the size and the card-outline should be changed
//5. please try to understand the "pricetype", not sure if we need to do useState for this part

// the props
type TaskCardProps = {
  state: 'BIDDING' | 'EXPIRED';
  category: string;
  title: string; 
  date: string;
  location: string;
  duration: number;
  estimatePrice:number;
  myOfferPrice: number;
  priceType:'Estimated Price' | 'My Offer';
};


// the task card
const TaskCard: React.FC<TaskCardProps> = ({ title, category, date, location, duration, estimatePrice,myOfferPrice, state, priceType }) => {
  return (
    <div className={`p-4 m-4 border rounded-lg ${state === 'EXPIRED' ? 'bg-gray-200 opacity-80' : 'bg-white'}  transition duration-300 ease-in-out`}>
      {/* the state (expried or bidding) */}
      <div className={`px-2 py-1 inline-block rounded-lg text-sm font-medium ${state === 'BIDDING' ? 'bg-blue-100 text-blue-600' : 'bg-gray-300 text-gray-500'}`}>
        {state}
      </div>

      {/* the category & title (in 1 column) */}
      <div className="mt-2 mb-4">
        <h5 className="text-sm text-gray-500 mb-1 mt-1">{category}</h5>
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>     
      </div>

      {/* the date, location, duration & Price, price type (estimate or myoffer price)   (in 2 columns)*/}
      <div className="grid grid-cols-2 gap-8 items-center text-sm mb-2">
        
        {/* Column 1 with icons */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 relative">
              <Image src="/icons/calendar.svg" alt="Date" layout='fill' objectFit='contain' />
            </div>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 relative">
              <Image src="/icons/marker.svg" alt="Location" layout='fill' objectFit='contain' />
            </div>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 relative">
              <Image src="/icons/clock.svg" alt="Duration" layout='fill' objectFit='contain' />
            </div>
            <p className="text-xs text-gray-500">{duration} hours</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-2 text-right">
          <p className="text-lg font-bold">
          {/* show the different price based on the different price type */}
          ${priceType === "My Offer" ? myOfferPrice : estimatePrice}
          </p>
          <p className="caption-semibold">{priceType}</p>
        </div>
        
      </div>
    </div>
  );
};


export default TaskCard;

