import cardType from "./cardtype"

type userType = {
    id: number
    name : string
    email : string
    imgUrl : string
    friends : userType[]
    cards : cardType[]
}

export default userType;