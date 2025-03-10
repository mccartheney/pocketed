import cardType from "@/types/cardtype"
import CheckUserExists from "../reusable_functions/checkUserExists"
import userType from "@/types/userType"
import HandleUser from "./handleUser"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class HandleCard {
    async createCard (email : string, cardName : string, balance : number ) {
        const user  = await CheckUserExists(email)

        if (! user) {
            return "User dont exists"
        }

        const handleUser = new HandleUser()
        const userCards= await handleUser.getCards(email)

        if (! userCards) {
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
        if (userCards!.some(card => card.name === cardName)) {
            return "Card already exists"
        }

        const card = await prisma.card.create({
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

    async getCard(cardId: number) {
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

    async getOwners(email : string, cardId : number) {
        const user  = await CheckUserExists(email)

        if (! user) {
            return "user dont exists"
        }

        const card = await this.getCard(cardId)

        if (! card) {
            return "card dont exists"
        }

        return card.owners
    }

    async getBalance(cardId : number) {
        const card = await this.getCard(cardId)

        if (! card) {
            return "card dont exists"
        }

        return card.balance
    }   

    async updateBalance(cardId : number, balance : number) {
        const card = await this.getCard(cardId)

        if (! card) {
            return "card dont exists"
        }

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