import React from 'react';

import { EditIcon } from './icons'; 

interface MyOfferProp {
    text: string;
    amount: string;
    onClick?: (...args: any[]) => void;
}

function MyOffer({ text, amount, onClick }: MyOfferProp) {
    return (
        <div className="px-4 py-3" onClick={onClick}>
            <div className="flex h-14 w-full flex-row items-center rounded-lg bg-penni-text-regular-light-mode bg-opacity-5 p-4">
                <span className="w-full text-lg font-medium text-penni-text-regular-light-mode">
                    {text}: {amount}
                </span>
                {onClick && (
                    <div className="ml-4 size-6">
                        <EditIcon strokeColour="penni-text-regular-light-mode" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyOffer;