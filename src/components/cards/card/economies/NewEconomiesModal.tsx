import cardType from "@/types/cardtype";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import economyType from "@/types/economieTypes";
const NewEconomiesModal = ({card, setEconomies}: {card: cardType, setEconomies: (economies: economyType[]) => void}) => {

    console.log("teste")

    // define refs
    const economyNameRef = useRef<HTMLInputElement>(null);
    const economyGoalRef = useRef<HTMLInputElement>(null);

    const handleCreateEconomy = async () => {

        // get the economy name and goal
        const economyName = economyNameRef.current?.value;
        const economyGoal = economyGoalRef.current?.value;

        // check if the economy name and goal are filled
        if (!economyName || !economyGoal) {
            toast.error("Please fill in all the fields");
            return;
        }   

        // create the economy
        const response = await axios.post("/api/economies", {
            economy: {
                description: economyName,
                goal: Number(economyGoal),
                cardId: card.id,
                balance: 0,
                imgUrl: "Sorry Joao, I dont have enough time to create the feature that would use the image of the economy"
            }
        })

        // check if the response is successful
        if (response.data.status === 200) {
            toast.success("Economy created successfully");
            const newEconomy = response.data.newEconomy;
            newEconomy.historic = [];
            setEconomies([...card.economies, newEconomy]);
        }else {
            toast.error(response.data.message);
        }
    }

    return (
        <dialog id="my_modal_11" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create a new economy</h3>
                <p className="py-4">Please fill in the following fields to create a new economy</p>
                <div className="divider my-0"></div>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Economy name</legend>
                    <input type="text" className="input" placeholder="japan trip" ref={economyNameRef} />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Goal</legend>
                    <input type="number" className="input" placeholder="2000" ref={economyGoalRef} />
                </fieldset>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-success mr-3" onClick={() => handleCreateEconomy()}>Create</button> 
                        <button className="btn btn-error">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default NewEconomiesModal;