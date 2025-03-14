import {
    FiArrowDown,
    FiArrowUp,
    FiBarChart,
    FiCreditCard,
    FiHome,
    FiSettings,    
} from "react-icons/fi";
import { GrGroup } from "react-icons/gr";

const Dock = () => {
    return (
        <div className="dock dock-xs">
            <button>
                <FiHome />
            </button>

            <button className="dock-active">
                <FiCreditCard />
            </button>

            <button>
                <FiArrowUp />
            </button>
            <button>
                <FiArrowDown/>
            </button>

            <button className="dock-active">
                <GrGroup/>
            </button>
                
            <button>
                <FiBarChart/>
            </button>

            <button>
                <FiSettings/>
            </button>
        </div>
    )
}

export default Dock;