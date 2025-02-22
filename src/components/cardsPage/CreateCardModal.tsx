import axios from "axios"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

const CreateCardModal = (
    { cardNameInput, cardValueInput}
    : 
    { cardNameInput: React.RefObject<HTMLInputElement>, cardValueInput: React.RefObject<HTMLInputElement> }
) => {
    const session = useSession()

    const handleCardCreation = () => {
        axios.post("/api/createCard", {
            name: cardNameInput.current.value,
            initialValue: cardValueInput.current.value,
            email: session.data?.user?.email
        })
            .then(response => {
                console.log(response.data.status)
                switch (response.data.status) {
                    case 409:
                        toast.error(`The card '${cardNameInput.current.value}' already exists !`)
                        break;

                    case 404:
                        toast.error(`This user dont exists exists !`)

                    default:
                        toast.success("sucess")
                        break;
                }
            })

    }

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-auto max-w-fit">
                <h3 className="font-bold text-lg">Create Card</h3>
                <p className="py-4">Fill the formulary to create a new card</p>
                <div className="modal-action m-0">
                    <form method="dialog" className="flex flex-col w-full">
                        <input
                            type="text"
                            ref={cardNameInput}
                            placeholder="Card name"
                            className="input input-bordered my-2 input-primary" />
                        <input
                            type="number"
                            ref={cardValueInput}
                            placeholder="0"
                            className="input input-bordered my-2 input-primary" />
                        <button className="btn my-2" onClick={() => handleCardCreation()}>Save</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default CreateCardModal