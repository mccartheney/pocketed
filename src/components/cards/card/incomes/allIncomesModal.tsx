import cardType, { incomeType } from "@/types/cardtype";
import { Dispatch, SetStateAction } from "react";
import { TbTrash } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-hot-toast";
const AllIncomesModal = ({incomes, setIncomes, card}: {incomes: incomeType[], setIncomes: Dispatch<SetStateAction<incomeType[]>>, card: cardType}) => {

    const handleDeleteIncome = async (income: incomeType) => {
        const response = await axios.delete("/api/incomes", {
            data: {
                incomeId: income.id,
            }
        })

        if (response.data.status === 200) {
            setIncomes(oldIncomes => oldIncomes.filter((incomeParam: incomeType) => incomeParam.id !== income.id))
            toast.success("Income deleted successfully")
        }else{
            toast.error("Error deleting income")
        }
    }   

    return (
        <dialog id="my_modal_10" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Incomes </h3>
                <div className="divider"></div>

                {incomes.length == 0 && (
                    <p className="text-center text-lg font-bold">You did not added any incomes here</p>
                )}

                {incomes.length > 0 && (
                    <ul className="list bg-base-200 p-1 w-full rounded-box shadow-md max-h-[500px] overflow-y-auto">
                        {incomes.map((income : incomeType) => (
                            <li className="list-row" key={income.id}>
                                <div>
                                    <div>{income.name}</div>
                                    <div className="text-xs uppercase font-semibold opacity-60">{income.value}  </div>
                                </div>
                                <button className="btn btn-square btn-ghost disabled: opacity-0"></button>
                                <button className="btn btn-square btn-error btn-outline" onClick={() => handleDeleteIncome(income)}>
                                    <TbTrash /> 
                                </button>
                            </li>
                            
                        ))}
                        
                    </ul>
                )}

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AllIncomesModal;