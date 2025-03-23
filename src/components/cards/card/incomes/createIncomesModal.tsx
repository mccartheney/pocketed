import { useRef, Dispatch, SetStateAction } from "react";
import axios from "axios";
import cardType, { incomeType } from "@/types/cardtype";
import { toast } from "react-hot-toast";
const CreateIncomesModal = ( {card, setIncomes} : {card: cardType, setIncomes: Dispatch<SetStateAction<incomeType[]>>}) => {

    // define refs
    const incomeName = useRef<HTMLInputElement>(null);
    const incomeBalance = useRef<HTMLInputElement>(null);

    // handle create income
    const handleCreateIncome = async () => {
        // check if all fields are filled
        if (!incomeName.current?.value || !incomeBalance.current?.value) {
            toast.error("Please fill in all fields");
            return;
        }

        // create income
        const response = await axios.post("/api/incomes", {
            name: incomeName.current?.value,
            value: incomeBalance.current?.value,
            cardId: card.id,
        });

        // if income is created successfully, show a success toast
        if (response.data.status === 200) {
            toast.success("Income created successfully");
            setIncomes(oldIncomes => [...oldIncomes, response.data.income]);
        } else {
            toast.error("Error creating income");
        }

        // clear the fields
        incomeName.current.value = "";
        incomeBalance.current.value = "";
    }

    return (
        <dialog id="my_modal_9" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create a new income</h3>
                <p className="py-4">Please fill in the following fields to create a new income</p>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name of expense</legend>
                    <input type="text" className="input" placeholder="Salary" ref={incomeName} />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">balance of expense</legend>
                    <input type="number" className="input" placeholder="800" ref={incomeBalance} />
                </fieldset>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-success mr-3" onClick={handleCreateIncome}>Create</button>
                        <button className="btn btn-error">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default CreateIncomesModal;