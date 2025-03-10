import cardType from "./cardtype"

type userType = {
    id: number;
    name: string;
    email: string;
    imgUrl: string | null;
    authMethod: string;
    theme: string;
    friendOf: userType[];
    friends: userType[];
    cards: cardType[];
}

export default userType;