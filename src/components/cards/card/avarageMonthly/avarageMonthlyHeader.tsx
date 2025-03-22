import { BiPlus } from "react-icons/bi"
import { CgMore } from "react-icons/cg"

const AvarageMonthlyHeader = () => {
    return (
            <div className="flex justify-between items-center">
                <h1>Avarage Monthly expenses</h1>
                <div className="flex">
                    <button className="btn btn-xs btn-primary mr-2" onClick={() => (document.getElementById('my_modal_7') as HTMLDialogElement)?.showModal()}><BiPlus /></button>
                <button className="btn btn-xs btn-primary" onClick={() => (document.getElementById('my_modal_8') as HTMLDialogElement)?.showModal()}><CgMore /></button>
                </div>
            </div>
    )
}
export default AvarageMonthlyHeader