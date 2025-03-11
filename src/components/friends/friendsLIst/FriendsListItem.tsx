import { PiPlus } from "react-icons/pi"

const FriendItem = () => {
    return (
        <li className="list-row">
            <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
            <div>
                <div>Dio Lupa</div>
                <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
            </div>
            <button className="btn btn-square btn-ghost">
                <PiPlus/>
            </button>
            
        </li>
    )
}

export default FriendItem