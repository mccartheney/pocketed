import { cardType } from "./expensesType"

type cardApiType = {
    id: number;
    name: string;
    totalAmount: number;
    createdAt: Date;
    userId: number;
    expenses: JSON;
}

export type { cardApiType }