'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';

const assets = [
    {
        id: 'crypto',
        image: '/media/landingPage/assets/crypto_assets.jpg',
        nameKey: 'assets.crypto',
        descKey: 'assets.crypto.desc',
        color: 'emerald',
        highlight: 'Cryptocurrency'
    },
    {
        id: 'forex',
        image: '/media/landingPage/assets/forex_asstes.jpg',
        nameKey: 'assets.forex',
        descKey: 'assets.forex.desc',
        color: 'blue',
        highlight: 'Forex Markets'
    },
    {
        id: 'stocks',
        image: '/media/landingPage/assets/stocks_assets.jpg',
        nameKey: 'assets.stocks',
        descKey: 'assets.stocks.desc',
        color: 'red',
        highlight: 'Equity & Stocks'
    },
    {
        id: 'cash',
        image: '/media/landingPage/assets/cash_assets.jpg',
        nameKey: 'assets.cash',
        descKey: 'assets.cash.desc',
        color: 'zinc',
        highlight: 'Cash Holdings'
    },
    {
        id: 'savings',
        image: '/media/landingPage/assets/saving_assets.jpg',
        nameKey: 'assets.savings',
        descKey: 'assets.savings.desc',
        color: 'green',
        highlight: 'Savings Deposits'
    },
    {
        id: 'realestate',
        image: '/media/landingPage/assets/realestate_assets.jpg',
        nameKey: 'assets.realestate',
        descKey: 'assets.realestate.desc',
        color: 'orange',
        highlight: 'Real Estate'
    },
    {
        id: 'alternative',
        image: '/media/landingPage/assets/alternative_assets.jpg',
        nameKey: 'assets.alternative',
        descKey: 'assets.alternative.desc',
        color: 'purple',
        highlight: 'Alternative Investments'
    },
    {
        id: 'collectibles',
        image: '/media/landingPage/assets/collectivles_assets.jpg',
        nameKey: 'assets.collectibles',
        descKey: 'assets.collectibles.desc',
        color: 'pink',
        highlight: 'Collectibles'
    },
];

const colorMap: Record<string, string> = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    red: 'text-red-400',
    zinc: 'text-zinc-300',
    green: 'text-green-400',
    orange: 'text-orange-400',
    purple: 'text-purple-400',
    pink: 'text-pink-400',
};

const getColorRGB = (color: string): string => {
    const rgbMap: Record<string, string> = {
        emerald: '52, 211, 153',
        blue: '96, 165, 250',
        red: '248, 113, 113',
        zinc: '212, 212, 216',
        green: '74, 222, 128',
        orange: '251, 146, 60',
        purple: '192, 132, 252',
        pink: '244, 114, 182',
    };
    return rgbMap[color] || '255, 255, 255';
};

export function AssetCoverflow() {
    const [activeIndex, setActiveIndex] = useState(1);
    const { t } = useLanguage();

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? assets.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === assets.length - 1 ? 0 : prev + 1));
    };

    const getVisibleCards = () => {
        const leftIndex = activeIndex === 0 ? assets.length - 1 : activeIndex - 1;
        const rightIndex = activeIndex === assets.length - 1 ? 0 : activeIndex + 1;
        return [leftIndex, activeIndex, rightIndex];
    };

    const [leftIdx, centerIdx, rightIdx] = getVisibleCards();

    return (
        <>
            <div className="coverflow-container relative flex justify-center items-center py-24">
                <button
                    onClick={handlePrev}
                    className="absolute left-4 md:left-12 z-20 w-12 h-12 rounded-full glass-panel border border-white/20 flex items-center justify-center hover:border-white/40 transition-all hover:scale-110"
                    aria-label="Previous asset"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="flex gap-4 items-center">
                    {/* Left Card */}
                    <motion.div
                        key={`left-${leftIdx}`}
                        animate={{ opacity: 0.6 }}
                        transition={{ type: "spring", stiffness: 200, damping: 35, mass: 0.8 }}
                        className="cover-card cover-left relative w-72 h-96 glass-panel rounded-lg overflow-hidden border border-white/10 cursor-pointer"
                        style={{ transformStyle: 'preserve-3d' }}
                        onClick={handlePrev}
                    >
                        <div className="absolute inset-0 grayscale contrast-125">
                            <Image
                                src={assets[leftIdx].image}
                                alt={t(assets[leftIdx].nameKey)}
                                fill
                                className="object-cover"
                                quality={90}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </motion.div>

                    {/* Center Card */}
                    <motion.div
                        key={`center-${centerIdx}`}
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 35, mass: 0.8 }}
                        className="cover-card cover-center relative w-80 h-[28rem] glass-panel rounded-lg overflow-hidden border border-white/20 z-10"
                        style={{
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 0 40px rgba(255, 255, 255, 0.15), 0 20px 60px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <div className="absolute inset-0 grayscale contrast-150">
                            <Image
                                src={assets[centerIdx].image}
                                alt={t(assets[centerIdx].nameKey)}
                                fill
                                className="object-cover"
                                quality={90}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-0 right-0 text-center z-10 px-6">
                            <motion.h4
                                key={`title-${centerIdx}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`font-sans font-bold text-3xl tracking-tighter uppercase ${colorMap[assets[centerIdx].color]}`}
                            >
                                {t(assets[centerIdx].nameKey)}
                            </motion.h4>
                        </div>
                    </motion.div>

                    {/* Right Card */}
                    <motion.div
                        key={`right-${rightIdx}`}
                        animate={{ opacity: 0.6 }}
                        transition={{ type: "spring", stiffness: 200, damping: 35, mass: 0.8 }}
                        className="cover-card cover-right relative w-72 h-96 glass-panel rounded-lg overflow-hidden border border-white/10 cursor-pointer"
                        style={{ transformStyle: 'preserve-3d' }}
                        onClick={handleNext}
                    >
                        <div className="absolute inset-0 grayscale brightness-50">
                            <Image
                                src={assets[rightIdx].image}
                                alt={t(assets[rightIdx].nameKey)}
                                fill
                                className="object-cover"
                                quality={90}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </motion.div>
                </div>

                <button
                    onClick={handleNext}
                    className="absolute right-4 md:right-12 z-20 w-12 h-12 rounded-full glass-panel border border-white/20 flex items-center justify-center hover:border-white/40 transition-all hover:scale-110"
                    aria-label="Next asset"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Dynamic Description */}
            <motion.div
                key={`description-${centerIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto text-center mt-12"
            >
                <motion.p
                    key={`asset-desc-${centerIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="font-sans text-zinc-500 text-base mb-8"
                >
                    {t(assets[centerIdx].descKey)}
                </motion.p>
                <p className="font-sans text-zinc-400 leading-relaxed text-xl font-light tracking-tight">
                    {t('assets.description').split('{highlight}')[0]}
                    <span className={`font-medium ${colorMap[assets[centerIdx].color]}`}>
                        {t(`assets.highlight.${assets[centerIdx].id}`)}
                    </span>
                    {t('assets.description').split('{highlight}')[1]}
                </p>
            </motion.div>
        </>
    );
}
