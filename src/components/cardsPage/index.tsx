import axios from "axios"
import { useState } from "react"

const CardPage = () => {

    useState(() => {
        axios.get("http://localhost:3000/api/getCards", {
            params:{"email" : "mccartheney@hotmail.com"}
        })
            .then((res) => {
                console.log(res)
            })
    })

    return (
        <h1>
            Cards
        </h1>
    )
}

export default CardPage