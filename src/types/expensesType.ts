type expenseType = {
    [key : string] : number
}

type weekExpensesType = {
    [key: string]: expenseType[] | []
}

type weekNameExpensesType = {
    [key:string] : weekExpensesType 
}

type mensalExpensesType = expenseType[]

type monthExpensesType = {
    [key: string]: {
        mensal: mensalExpensesType | null,
        unique: weekNameExpensesType | null
    }
}
type cardType = {
    [key: number]: monthExpensesType
} | null


export type {
    expenseType, weekExpensesType, mensalExpensesType, weekNameExpensesType, monthExpensesType, cardType
}