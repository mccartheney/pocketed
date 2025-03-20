
// define the expenses day event
const expensesDayEvent = (expensesDay : number) => new CustomEvent("expensesDayEvent", { detail: { expensesDay } })

export default expensesDayEvent