import userType from "./userType"

type economyType = {
    id : number
    description: string
    goal : number
    balance: number
    historic : historicType[]
    imgUrl : string
    cardId : number
}

type historicType = {
    date : Date
    value : number
    user : userType
    tType : "expense" | "income"
}

export type { historicType }
export default economyType;