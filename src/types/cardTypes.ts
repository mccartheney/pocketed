import { cardType } from "./expensesType"

type cardDbType = {
    name: string;
    id: number;
    createdAt: Date;
    totalAmount: number;
    userId: number;
    expenses: JSON;
} | null

export type {cardDbType}