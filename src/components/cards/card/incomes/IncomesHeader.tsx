import { BiPlus } from "react-icons/bi";
import { CgMore } from "react-icons/cg";

const IncomesHeader = () => {
    return (
        <>
            <div className="flex flex-row justify-between items-center mb-2">
                <h3 className="text-lg font-bold">Incomes</h3>
                
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <button className="btn btn-xs btn-primary mr-2" onClick={() => (document.getElementById('my_modal_9') as HTMLDialogElement)?.showModal()}><BiPlus /></button>
                        <button className="btn btn-xs btn-primary" onClick={() => (document.getElementById('my_modal_10') as HTMLDialogElement)?.showModal()}><CgMore /></button>
                    </div>
                </div>

            </div>
            <div className="divider my-0"></div>
        </>
    )
}

export default IncomesHeader;