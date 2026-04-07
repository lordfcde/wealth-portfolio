'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        'nav.features': 'Features',
        'nav.pricing': 'Pricing',
        'nav.about': 'About',
        'nav.signin': 'Sign in',
        'nav.getstarted': 'Get Started',
        'hero.scroll': 'Scroll down',
        'intro.title': 'Manage your assets',
        'intro.subtitle': 'smarter.',
        'intro.description': 'The premium personal finance platform with realtime asset tracking. Minimalist design, focused on core data.',
        'intro.cta.primary': 'Get Started',
        'intro.cta.secondary': 'Explore Features',
        'features.title': 'Everything you need.',
        'features.subtitle': 'Complete control over your financial picture.',
        'features.realtime': 'Realtime Dashboard',
        'features.realtime.desc': 'Asset values updated every second with zero latency.',
        'features.multiasset': 'Multi-Asset',
        'features.multiasset.desc': 'Crypto, Forex & VN Stock support.',
        'features.pl': 'P/L Tracking',
        'features.pl.desc': 'Realtime profit & loss calculations.',
        'features.alerts': 'Price Alerts',
        'features.alerts.desc': 'Custom notifications when prices hit your targets.',
        'footer.product': 'Product',
        'footer.company': 'Company',
        'footer.legal': 'Legal',
        'footer.copyright': 'All rights reserved.',
    },
    vi: {
        'nav.features': 'Tính năng',
        'nav.pricing': 'Bảng giá',
        'nav.about': 'Về chúng tôi',
        'nav.signin': 'Đăng nhập',
        'nav.getstarted': 'Bắt đầu',
        'hero.scroll': 'Cuộn xuống',
        'intro.title': 'Quản lý tài sản',
        'intro.subtitle': 'thông minh hơn.',
        'intro.description': 'Nền tảng quản lý tài chính cá nhân và theo dõi bảng giá realtime cao cấp nhất dành cho bạn. Thiết kế tối giản, tập trung vào dữ liệu cốt lõi.',
        'intro.cta.primary': 'Bắt đầu ngay',
        'intro.cta.secondary': 'Khám phá tính năng',
        'features.title': 'Mọi thứ bạn cần.',
        'features.subtitle': 'Kiểm soát hoàn toàn bức tranh tài chính của bạn.',
        'features.realtime': 'Bảng điều khiển Realtime',
        'features.realtime.desc': 'Giá trị tài sản được cập nhật mỗi giây với độ trễ bằng 0.',
        'features.multiasset': 'Đa Tài Sản',
        'features.multiasset.desc': 'Hỗ trợ Crypto, Forex & VN Stock.',
        'features.pl': 'Theo dõi Lãi/Lỗ',
        'features.pl.desc': 'Tính toán lãi/lỗ realtime.',
        'features.alerts': 'Cảnh báo Giá',
        'features.alerts.desc': 'Thông báo tùy chỉnh khi giá đạt mục tiêu của bạn.',
        'footer.product': 'Sản phẩm',
        'footer.company': 'Công ty',
        'footer.legal': 'Pháp lý',
        'footer.copyright': 'Mọi quyền được bảo lưu.',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations['en']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
