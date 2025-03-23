import CheckUserExists from "../reusable_functions/checkUserExists"
import HandleUser from "./handleUser"
import { PrismaClient } from "@prisma/client"

//  init prisma client
const prisma = new PrismaClient()

class HandleCard {

    //  method to get cards
    async getCards(email : string) {
        //  check if user exists
        const user  = await CheckUserExists(email)

        //  if user dont exists, return error
        if (! user) {return "User dont exists"}

        //  init handle user
        const handleUser = new HandleUser() 

        //  get user cards
        const userCards = await handleUser.getCards(email)

        //  return user cards
        return userCards
    }

    //  method to create card
    async createCard (email : string, cardName : string, balance : number ) {
        //  check if user exists and return error if not
        const user  = await CheckUserExists(email)
        if (! user) {return "User dont exists"}

        //  init handle user
        const handleUser = new HandleUser()

        //  get user cards
        let userCards= await handleUser.getCards(email)

        //  check if card name already exists
        if (userCards!.some(card => card.name === cardName && card.creatorId === user.id)) return "Card already exists"

        //  create card
        const card  = await prisma.card.create({
            data: {
                name: cardName,
                creator: { connect: { id: user.id } },
                owners: { connect: [{ id: user.id }] },
                expenses: { create: [] },
                balance: balance,
                economies: { create: [] },
                incomes: { create: [] }
            },
            include: {
                creator: true,
                owners: true,
                expenses: true,
                economies: true,
                incomes:true
            }
        })

        await prisma.income.create({
            data: {
                name: "Initial balance",
                value: balance,
                cardId: card.id,
                date: new Date()
            }
        })

        //  disconnect prisma and return card
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
                expenses: true,
                incomes: true
            }
        })

        //  disconnect prisma and return card
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

        //  return card owners
        return card.owners
    }

    //  method to add owner to card
    async addOwner(email : string, cardId : number, addOwnerId : number) {
        //  check if user exists
        const user = await CheckUserExists(email)
        if (! user) {return "user dont exists"}

        //  get card
        const card = await this.getCard(cardId)
        if (! card) {return "card dont exists"}

        //  add owner to card
        await prisma.card.update({
            where : { id : cardId },
            data : { owners : { connect: { id: addOwnerId } } }
        })

        //  disconnect prisma and return card
        await prisma.$disconnect()
        return card
    }

    //  method to remove owner from card
    async removeOwner(email : string, cardId : number, removeOwnerId : number) {
        //  check if user exists
        const user = await CheckUserExists(email)
        if (! user) {return "user dont exists"}

        //  get card
        const card = await this.getCard(cardId)
        if (! card) {return "card dont exists"}

        //  remove owner from card
        await prisma.card.update({
            where : { id : cardId },
            data : { owners : { disconnect: { id: removeOwnerId } } }
        })

        //  disconnect prisma and return card
        await prisma.$disconnect()
        return card
    }   

    //  method to get card balance
    async getBalance(cardId : number) {
        //  get card and return and error if card dont exists
        const card = await this.getCard(cardId)
        if (! card) {return "card does not exists"}

        //  return card balance
        return card.balance
    }   

    //  method to update card balance
    async updateBalance(cardId : number, balance : number) {
        //  get card
        const card = await this.getCard(cardId)

        //  if card dont exists, return error
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

        //  disconnect prisma and return card
        await prisma.$disconnect()    
        return card
    }

    //  method to delete card
    async deleteCard(email : string, cardId : number) {
        //  check if user exists and return error if not
        const user  = await CheckUserExists(email)
        if (! user) {return "user dont exists"}

        //  get card and return error if card dont exists
        const card = await this.getCard(cardId)
        if (! card) {return "card dont exists"}

        //  delete card
        await prisma.card.delete({
            where : { id : cardId }
        })

        //  disconnect prisma and return message
        await prisma.$disconnect()
        return "card deleted"
    }

    //  method to rename card
    async renameCard(email : string, cardId : number, newName : string) {
        //  check if user exists and return error if not
        const user = await CheckUserExists(email)
        if (!user) return "user dont exists"

        //  get card and return error if card dont exists
        const card = await this.getCard(cardId)
        if (!card) return "card dont exists"

        //  get user cards and return error if user dont have cards
        const userCards = await this.getCards(email)
        if (userCards === "User dont exists") return userCards
        
        //  check if card name already exists and return error if it does
        if (userCards!.some(card => card.name === newName && card.creatorId === user.id)) return "card name already exists"

        //  update card name
        const updatedCard = await prisma.card.update({
            where : { id : cardId },
            data : { name : newName }
        })

        //  disconnect prisma and return card
        await prisma.$disconnect()
        return updatedCard
    }   
}

export default HandleCard