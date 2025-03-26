"use client"
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Header from './header';
import Welcome from './welcome';
import Features from './feautures';
import Testimonials from './testemunials';
import Pricing from './pricing';
import CTA from './cta';
import Footer from './footer';
export default function Home() {
    
    return (
        <div>
            <Header />
            <Welcome />
            <Features />
            <Testimonials />
            <Pricing />
            <CTA />
            <Footer />
        </div>
    );
}