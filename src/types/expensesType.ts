type expenseType = {
    [key : string] : number
}

type weekExpensesType = {
    [key: string]: expenseType[] | []
}
type mensalExpensesType = expenseType[]

type monthExpensesType = {
    [key: string]: {
        mensal: mensalExpensesType | null,
        unique: weekExpensesType | null
    }
}
type cardType = {
    [key: number]: monthExpensesType
} | null


export type {
    expenseType, weekExpensesType, mensalExpensesType, monthExpensesType, cardType
}