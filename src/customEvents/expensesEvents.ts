const expensesDayEvent = (expensesDay : number) => new CustomEvent("expensesDayEvent", { detail: { expensesDay } })

export default expensesDayEvent