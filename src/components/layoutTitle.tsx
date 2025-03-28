import monthsName from "@/constants/months"
import weekDays from "@/constants/weekDays"
import { IoIosNotificationsOutline } from "react-icons/io"

const LayoutTitle = () => {

    // get dates
    const date = new Date()
    const monthDay = date.getDate()
    const month = monthsName[date.getMonth()]
    const weekDay = weekDays[date.getDay()]

    // return the layout title
    return (
        <div className="flex items-center font-bold md:text-xl m-3 bg-base-200 justify-between rounded-2xl p-3 h-[8%]">
            <div className="ml-3">
                <h2>
                    {weekDay}, {monthDay} {month}
                </h2>
            </div>
            <div className="mr-3">
            </div>
        </div>
    )
}

export default LayoutTitle