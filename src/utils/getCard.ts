import axios from "axios"

const getAllCards = async(
    {userEmail} : {userEmail : string}
) => {
    // get user cards and turn loading false
    const data = axios.get("/api/cards", {
        params: { "email": userEmail }
    })

    return await data
}

export default getAllCards