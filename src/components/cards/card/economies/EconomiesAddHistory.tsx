import { useUser } from "@/context/userContext";
import economyType, { historicType } from "@/types/economieTypes";
import axios from "axios";
import { Dispatch, useRef, useState } from "react";
import { SetStateAction } from "react";
import { toast } from "react-hot-toast";

const EconomiesAddHistory = ({selectedEconomy, setHistory, setEconomies}: {selectedEconomy: economyType | null | undefined, setHistory: Dispatch<SetStateAction<historicType[]>>, setEconomies: Dispatch<SetStateAction<economyType[]>>}) => {
    
    const {user} = useUser();   
    const balanceInputRef = useRef<HTMLInputElement>(null);
 
    const handleAddHistory = async () => {
        const balance = balanceInputRef!.current!.value;
        
        const response = await axios.post("/api/economies", {
            historic : {
                value: Number(balance),
                tType: "income",
                user: user
            },
            economyId: selectedEconomy?.id,
        })

        if (response.data.status === 200) {
            setHistory(oldHistory => [...oldHistory, response.data.newHistoric]);
            const economyToUpdate = selectedEconomy;
            if (economyToUpdate) {
                economyToUpdate.historic.push(response.data.newHistoric);
                setEconomies(oldEconomies => [...oldEconomies.map(economy => economy.id === selectedEconomy?.id ? economyToUpdate : economy)]);
            }
            toast.success(response.data.message);
        }else {
            toast.error(response.data.message);
        }
    }
    
    return (
        <dialog id="my_modal_12" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add balance to {selectedEconomy?.description}</h3>
                <p className="py-2">please enter the amount of balance you want to add</p>
                <div className="divider my-0"></div>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Balance</legend>
                    <input type="number" className="input" placeholder="155" ref={balanceInputRef} />
                </fieldset>

                <div className="modal-action">
                <form method="dialog">
                    <button className="btn btn-success mr-2" onClick={ () => handleAddHistory()}>Add</button>
                    <button className="btn btn-error">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}   

export default EconomiesAddHistory;