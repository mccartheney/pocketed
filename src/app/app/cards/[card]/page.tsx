"use client"

import CardDeleteModel from '@/components/card/CardDeleteModel';
import CardInfoHeader from '@/components/card/CardInfoHeader';
import LoadingPage from '@/components/LoadingPage';
import { cardApiType } from '@/types/cardTypes';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
    // get user email
    const session = useSession ()
    const userEmail = session.data?.user?.email

    // get params by url
    const params = useParams();
    const cardNameFromParam = params.card;

    // states for loading and card
    const [card, setCard] = useState <cardApiType>()
    const [loading, setLoading] = useState <boolean>(true)

    useEffect (function getThisCard () {
        axios.get (`/api/cards`, {
            params : {email : userEmail, cardName : cardNameFromParam}

        })
            .then (response => {
                if (response.data.status == 200) setCard(response.data.message)
                setLoading(false)
            })

    },[])

    if (loading) return <LoadingPage/>

    return (
        <>
            <CardInfoHeader card={card!} setCard={setCard} />
            <CardDeleteModel cardName={card!.name} />
        </>
    );
}

export default Page;