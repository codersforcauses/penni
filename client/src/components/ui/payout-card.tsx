import React from 'react';

interface PayoutCardProps {
  title: string;
  description: string;
}

const PayoutCard: React.FC<PayoutCardProps> = ({ title, description }) => {
  return (
    <div className="w-full p-4 border-b border-gray-200">
      <p className="text-[13px] font-normal leading-[15.51px] text-black text-opacity-60 mb-1">{title}</p>
      <p className="text-[17px] text-black leading-[20.29px]">{description}</p>
    </div>
  );
};

export default PayoutCard;
