'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.div
            className="flex items-center space-x-2  text-2xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y:-100 }}
            animate={{ opacity: 1, y:0}}
            transition={{ duration:1 }}
        >
            <div className="w-10 h-10 bg-primary ml-3  rounded-full flex items-center justify-center text-white font-extrabold">
                P
            </div>
            <span>Pocketed</span>
        </motion.div>
    );
};

export default Logo;
