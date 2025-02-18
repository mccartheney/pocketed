import { motion } from "framer-motion";

const DrawerDivider = (
    {marginPosition} : {marginPosition : string}
) => {
    return <motion.div 
        className={`divider m${marginPosition}-0`}
        initial={{
            width : 0
        }}
        animate={{
            width : "100%"
        }}
        transition={{ duration: 1, delay:.3}}
    />
}

export default DrawerDivider