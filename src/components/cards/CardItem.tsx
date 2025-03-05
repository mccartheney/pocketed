import { cardApiType } from '@/types/cardTypes';
import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';

const CardItem = (
    { userName, card }: {userName: string, card: cardApiType  }
) => {
    const date = new Date (card.createdAt)
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    let cardName = card.name.replaceAll(" ", "%20")

    return (
        <div className="w-full h-52 m-auto bg-base-200 rounded-xl relative shadow-2xl transition-transform transform ">

            <Link href={`/app/cards/${cardName}`}>
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
                    <div className="w-14 h-14 relative"/>
                        
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
                            <p className="font-medium tracking-wider text-sm">{card.totalAmount}€</p>
                        </div>
                        <div>
                            <p className="font-light text-xs">Owners</p>
                            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                <div className="avatar">
                                    <div className="w-4">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;