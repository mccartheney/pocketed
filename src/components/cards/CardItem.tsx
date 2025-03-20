import cardType from '@/types/cardtype';
import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
import userType from '@/types/userType';

const CardItem = (
    { userName, card }: { userName: string, card: cardType }
) => {
    // define the date
    const date = new Date(card.createdAt)
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    // return the card item
    return (
        <div className="w-full h-52 m-auto bg-base-200 rounded-xl relative shadow-2xl transition-transform transform ">

            <Link href={`/app/cards/${card.id}`}>
                <button className="btn btn-xs text-xs btn-primary absolute top-4 right-4">
                    <FaArrowRight />
                </button>
            </Link>

            <div className="w-full px-8 absolute top-8">
                <div className="flex justify-between">
                    <div>
                        <p className="font-light">Name</p>
                        <p className="font-medium tracking-widest">{userName}</p>
                    </div>
                    <div className="w-14 h-14 relative" />

                </div>

                <div className="pt-1">
                    <p className="font-light">Card Name</p>
                    <p className="font-medium tracking-more-wider">{card.name}</p>
                </div>

                <div className="pt-6 pr-6">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-light text-xs">Created at</p>
                            <p className="font-medium tracking-wider text-sm">{month}/{year}</p>
                        </div>
                        <div>
                            <p className="font-light text-xs">Balance</p>
                            <p className="font-medium tracking-wider text-sm">{card.balance}€</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="font-light text-xs">Owners</p>
                            <div className="avatar-group -space-x-9 w-full flex justify-end">
                                {card.owners.map((owner : userType) => {
                                    return (
                                        <div className="avatar mr-3" key={owner.id}>
                                            <div className="w-5">
                                                <img src={owner.imgUrl!} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;