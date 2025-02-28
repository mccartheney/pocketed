
import { FaPlus } from "react-icons/fa"

const CardsHeader = () => {
    return (
        <div className="cardHeader">
            <div className="cardHeader_title mt-3 relative">
                <div className="flex w-full justify-between">
                    <h2 className="text-2xl font-bold">
                        Cards
                    </h2>

                    <button
                        className="btn btn-sm btn-primary"
                        
                        onClick={() => document.getElementById('my_modal_1')!.showModal()}
                    >
                            <FaPlus/>
                    </button>
                </div>

                <div
                    className={`divider`}
                 
                />
            </div>
        </div>
    )
}

export default CardsHeader