import { Income, PrismaClient } from "@prisma/client";
import handleCards from "./handleCard";
const prisma = new PrismaClient();

class handleIncomes {   
    
    // create a new income
    async createIncome(cardId: number, incomeName: string, incomeBalance: number) {
        // check if card exists
        const handleCard = new handleCards();
        const card = await handleCard.getCard(cardId);
        if (!card) {
            return "Card not found";
        }
        
        // try to create the income
        try {
            // create income and return it
            const income = await prisma.income.create({
                data: {
                    name: incomeName,
                value: incomeBalance,
                cardId: cardId,
                date: new Date(),
            }});

            await prisma.card.update({
                where: {
                    id: cardId,
                },
                data: {
                    balance: card.balance + incomeBalance,
                },
            });

            return income;
        } catch (error) { // if there is an error, return the error
            return "Error creating income";
        }
    }

    // get all incomes
    async getAllIncomes(cardId: number) {
        // check if card exists
        const handleCard = new handleCards();
        const card = await handleCard.getCard(cardId);
        if (!card) {
            return "Card not found";
        }

        // try to get all incomes
        try {
            // get all incomes and return them
            const incomes = await prisma.income.findMany({
                where: {
                    cardId: cardId,
                },
            });

            return incomes;
        } catch (error) { // if there is an error, return the error
            return "Error getting incomes";
        }
    }

    // delete an income
    async deleteIncome(incomeId: number) {
        // check if income exists, if not return an error
        const income = await prisma.income.findUnique({
            where: {
                id: incomeId,
            },
        }); 
        if (!income) return "Income not found";

        // check if card exists
        const handleCard = new handleCards();
        const card = await handleCard.getCard(income.cardId);
        if (!card) {
            return "Card not found";
        }

        // try to delete the income
        try {
            // delete the income and return a success message
            await prisma.income.delete({
                where: {
                    id: incomeId,
                },
            });

            await prisma.card.update({
                where: {
                    id: card.id,
                },
                data: {
                    balance: card.balance - income.value,
                },
            });

            return "Income deleted";
        } catch (error) { // if there is an error, return the error
            return "Error deleting income";
        }
    }
}

export default handleIncomes;
