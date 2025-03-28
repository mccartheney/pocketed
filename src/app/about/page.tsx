"use client"
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaShieldAlt, FaLightbulb, FaWallet } from 'react-icons/fa';
import Header from '@/components/landingPage/header';
import Footer from '@/components/landingPage/footer';
import Credits from '@/components/about/credits';
import Stats from '@/components/about/stats';
import Values from '@/components/about/values';
import Story from '@/components/about/story';
import Hero from '@/components/about/hero';
const AboutPage = () => {


    return (
        <div className="min-h-screen bg-base-100">
            <Header />
            <main>
                <Hero />
                <Story />
                <Values />
                <Stats />
            </main>

            <Credits />

            <Footer />
        </div>
    );
};

export default AboutPage;