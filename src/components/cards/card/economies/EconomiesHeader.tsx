import cardType from "@/types/cardtype"
import { BiPlus, BiTrash } from "react-icons/bi"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { PiPlus } from "react-icons/pi"

const EconomiesHeader = ({card}: {card: cardType}) => {
    
    return (
        <div className="">
            <div className="flex flex-row justify-between items-center mb-1">
                <div className="flex items-center">
                    <h3 className="text-lg font-bold">Economies</h3>
                    {card.economies.length > 0 && (
                        <>
                            <button className="btn btn-ghost btn-sm text-xl mr-2"><FaChevronLeft/></button>
                            <button className="btn btn-primary btn-xs text-xl mr-2"><BiPlus/></button>
                            <button className="btn btn-ghost btn-sm text-xl mr-2"><FaChevronRight/></button>
                        </>
                    )}
                </div>

                <div className="">
                    {card.economies.length > 0 && (
                        <p className="text-sm text-primary">
                            Economie name
                        </p>
                    )}
                </div>

                <div className="">
                    <button className="btn btn-primary btn-sm text-xl mr-2">
                        <PiPlus/>
                    </button>
                    
                    {card.economies.length > 0 && (
                        <button className="btn btn-error btn-sm text-xl">
                            <BiTrash/>
                        </button>
                    )}
                </div>
            </div>
            <div className="divider my-0"></div>
        </div>
    )
}

export default EconomiesHeader