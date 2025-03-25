import { PrismaClient } from "@prisma/client";
import HandleCard from "./handleCard";
import economyType, { historicType }  from "@/types/economieTypes";

const prisma = new PrismaClient();

class HandleEconomie {

    // get all economies from a card
    async getEconomies(cardId: number) {
        // get the card, if not found return an error
        const handleCard = new HandleCard();
        const card = await handleCard.getCard(cardId);

        if (!card) return "card not found"

        // get all economies from the card
        const economies = await prisma.economy.findMany({
            where: {
                cardId: cardId
            }
        })

        //  disconnect prisma and return economies
        await prisma.$disconnect()  
        return economies;
    }

    // get a specific economy
    async getEconomie(economieId: number) {
        // get the economy, if not found return an error
        const economy = await prisma.economy.findFirst({
            where: {
                id: economieId
            }
        })

        if (!economy) return "economy not found"

        //  disconnect prisma and return economy
        await prisma.$disconnect()  
        return economy;
    }

    // create a new economy
    async createEconomy(economie: economyType) {
        // get the card, if not found return an error
        const handleCard = new HandleCard();
        const card = await handleCard.getCard(economie.cardId);
        if (!card) return "card not found"

        // check if the economy already exists, if so return an error
        const economy = await prisma.economy.findFirst({
            where: {
                description: economie.description
            }
        })
        if (economy) return "economy already exists"
        
        // create the new economy
        const newEconomy = await prisma.economy.create({
            data: {
                description: economie.description,
                goal: economie.goal,
                balance: economie.balance,
                imgUrl: economie.imgUrl,
                cardId: economie.cardId,
                historic: {create:[]}
            }
        })

        //  disconnect prisma and return new economy
        await prisma.$disconnect()  
        return newEconomy;
    }

    // add a historic to an economy
    async addHistoric(economieId: number, historic: historicType) {
        // get the economy, if not found return an error
        const economy = await this.getEconomie(economieId);
        if (!economy) return "economy not found"
        
        // add the historic to the economy
        const newHistoric = await prisma.historic.create({
            data: {
                date: new Date(),
                value: historic.value,
                tType: historic.tType,
                economyId: economieId,
                userId: historic.user.id
            }
        })

        //  disconnect prisma and return new historic
        await prisma.$disconnect()  
        return newHistoric;
    }

    async getHistoric(historicId: number) {
        // get the historic, if not found return an error
        const historic = await prisma.historic.findFirst({
            where: {
                id: historicId
            }
        })

        // if the historic is not found, return an error
        if (!historic) return "historic not found"

        //  disconnect prisma and return historic
        await prisma.$disconnect()  
        return historic;
    }

    // delete    a historic from an economy
    async deleteHistoric(historicId: number) {
        // get the historic, if not found return an error
        const historic = await this.getHistoric(historicId);
        if (!historic) return "historic not found"
        
        // delete the historic
        await prisma.historic.delete({
            where: {
                id: historicId
            }
        })
        
        //  disconnect prisma and return deleted historic
        await prisma.$disconnect()  
        return "historic deleted";
    }

    async deleteEconomy(economieId: number) {
        // get the economy, if not found return an error
        const economy = await this.getEconomie(economieId);
        if (!economy) return "economy not found"
        
        // delete the economy
        await prisma.economy.delete({
            where: {
                id: economieId
            }
        })
        
        //  disconnect prisma and return deleted economy
        await prisma.$disconnect()  
        return "economy deleted";
    }
}

export default HandleEconomie;