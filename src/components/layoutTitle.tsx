import monthsName from "@/constants/months"
import weekDays from "@/constants/weekDays"
import { IoIosNotificationsOutline } from "react-icons/io"

const LayoutTitle = () => {

    // get dates
    const date = new Date()
    const monthDay = date.getDate()
    const month = monthsName[date.getMonth()]
    const weekDay = weekDays[date.getDay()]

    return (
        <div className="flex items-center font-bold md:text-xl m-3 bg-base-200 justify-between rounded-2xl p-3 h-20">
            <div className="ml-3">
                <h2>
                    {weekDay}, {monthDay} {month}
                </h2>
            </div>
            <div className="mr-3">
                <IoIosNotificationsOutline />
            </div>
        </div>
    )
}

export default LayoutTitle