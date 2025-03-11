import cardType from "@/types/cardtype"
import CheckUserExists from "../reusable_functions/checkUserExists"
import userType from "@/types/userType"
import HandleUser from "./handleUser"
import { PrismaClient } from "@prisma/client"

//  init prisma client
const prisma = new PrismaClient()

class HandleCard {
    //  method to create card
    async createCard (email : string, cardName : string, balance : number ) {
        //  check if user exists
        const user  = await CheckUserExists(email)

        if (! user) {return "User dont exists"}

        //  init handle user
        const handleUser = new HandleUser()

        //  get user cards
        const userCards= await handleUser.getCards(email)

        //  check if card name already exists
        if (userCards!.some(card => card.name === cardName)) {
            return "Card already exists"
        }
        
        const card  = await prisma.card.create({
            data: {
                name: cardName,
                creator: { connect: { id: user.id } },
                owners: { connect: [{ id: user.id }] },
                expenses: { create: [] },
                balance: balance,
                economies: { create: [] }
            },
            include: {
                creator: true,
                owners: true,
                expenses: true,
                economies: true
            }
        })
        return card
    }

    //  method to get card
    async getCard(cardId: number) { 
        //  get card
        const card = await prisma.card.findUnique({
            where: { id: cardId },
            include: {
                creator: true,
                owners: true,
                expenses: {
                    include: {
                        yearExpenses: {
                            include: {
                                AllExpenses: true
                            }
                        }
                    }
                },
                economies: true
            }
        })
        return card
    }

    //  method to get card owners
    async getOwners(email : string, cardId : number) {
        //  check if user exists
        const user  = await CheckUserExists(email)

        if (! user) {return "user dont exists"}

        //  get card
        const card = await this.getCard(cardId)

        //  if card dont exists, return error
        if (! card) {return "card dont exists"}

        return card.owners
    }

    //  method to get card balance
    async getBalance(cardId : number) {
        //  get card and return 
        const card = await this.getCard(cardId)

        if (! card) {return "card dont exists"}

        return card.balance
    }   

    //  method to update card balance
    async updateBalance(cardId : number, balance : number) {
        //  get card
        const card = await this.getCard(cardId)

        if (! card) {return "card dont exists"}

        //  update card balance and return
        await prisma.card.update({
            where : {
                id : cardId
            },
            data : {
                balance : balance
            }
        })

        return card
    }

}

export default HandleCard