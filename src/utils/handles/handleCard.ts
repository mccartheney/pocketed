import CheckUserExists from "../reusable_functions/checkUserExists"
import HandleUser from "./handleUser"
import { PrismaClient } from "@prisma/client"

//  init prisma client
const prisma = new PrismaClient()

class HandleCard {

    async getCards(email : string) {
        const user  = await CheckUserExists(email)

        if (! user) {return "User dont exists"}

        const handleUser = new HandleUser() 
        const userCards = await handleUser.getCards(email)
    
        return userCards
    }

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
        if (userCards!.some(card => card.name === cardName && card.creatorId === user.id)) {
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
        

        await prisma.$disconnect()    
        return card
    }

    //  method to get card
    async getCard(cardId: number) { 
        //  get card
        const card = await prisma.card.findFirst({
            where: { id: cardId },
            include: {
                creator: true,
                owners: true,
                economies: true,
                expenses: true
            }
        })
        await prisma.$disconnect()    
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

        if (! card) {return "card does not exists"}

        return card.balance
    }   

    //  method to update card balance
    async updateBalance(cardId : number, balance : number) {
        //  get card
        const card = await this.getCard(cardId)

        if (! card) {return "card does not exists"}

        //  update card balance and return
        await prisma.card.update({
            where : {
                id : cardId
            },
            data : {
                balance : balance
            }
        })

        await prisma.$disconnect()    
        return card
    }

    //  method to delete card
    async deleteCard(email : string, cardId : number) {
        //  check if user exists
        const user  = await CheckUserExists(email)

        if (! user) {return "user dont exists"}

        //  get card
        const card = await this.getCard(cardId)

        if (! card) {return "card dont exists"}

        //  delete card
        await prisma.card.delete({
            where : { id : cardId }
        })

        await prisma.$disconnect()
        return "card deleted"
    }

    async renameCard(email : string, cardId : number, newName : string) {
        const user = await CheckUserExists(email)
        if (!user) return "user dont exists"

        const card = await this.getCard(cardId)
        if (!card) return "card dont exists"
        
        const userCards = await this.getCards(email)
        if (typeof userCards === "string") return userCards
        
        if (userCards!.some(card => card.name === newName && card.creatorId === user.id)) {
            return "card name already exists"
        }

        const updatedCard = await prisma.card.update({
            where : { id : cardId },
            data : { name : newName }
        })

        await prisma.$disconnect()
        return updatedCard
    }   
}

export default HandleCard