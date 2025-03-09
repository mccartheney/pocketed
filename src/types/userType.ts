import cardType from "./cardtype"

type userType = {
    id: number
    name : string
    email : string
    imgUrl : string
    friensds : userType[]
    cards : cardType[]
}

export default userType;