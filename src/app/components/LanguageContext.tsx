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
        'nav.assets': 'Assets',
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
        'features.multiasset.desc': 'Track crypto, forex, gold, and Vietnamese stocks—all in one unified portfolio.',
        'features.pl': 'P/L Tracking',
        'features.pl.desc': 'Realtime profit & loss calculations.',
        'features.advisor': 'AI Portfolio Advisor',
        'features.advisor.desc': 'Intelligent recommendations to optimize your portfolio allocation based on market conditions and risk profile.',
        'features.news': 'Asset News Updates',
        'features.news.desc': 'Stay informed with real-time news and market insights for all your tracked assets.',

        // Asset Types
        'assets.title': 'Track Every Asset',
        'assets.subtitle': 'Comprehensive portfolio management across all asset classes.',
        'assets.crypto': 'Digital Assets',
        'assets.crypto.desc': 'Explore the future of value. Manage your cryptocurrency portfolio with absolute security and real-time insights.',
        'assets.forex': 'Forex & Currency',
        'assets.forex.desc': 'The power of global currencies. Track exchange rate fluctuations and manage foreign reserves for cross-border journeys.',
        'assets.gold': 'Precious Metals',
        'assets.gold.desc': 'The eternal safe haven. Protect asset value against inflation by storing gold, silver, and rare precious metals.',
        'assets.stocks': 'Stock Market',
        'assets.stocks.desc': 'Accompany global growth. Analyze stock portfolios, ETFs, and market indices with real-time data.',
        'assets.cash': 'Cash',
        'assets.cash.desc': 'Resources ready for every opportunity. Track cash flow and payment accounts transparently and instantly.',
        'assets.savings': 'Smart Savings',
        'assets.savings.desc': 'The foundation for financial peace of mind. Optimize savings deposits and certificates with the best interest rates.',
        'assets.realestate': 'Real Estate',
        'assets.realestate.desc': 'Value that endures through time. Digitize your portfolio of land, apartments, and long-term real estate investments.',
        'assets.alternative': 'Alternative Investments',
        'assets.alternative.desc': 'Beyond traditional boundaries. Diversify with P2P lending, crowdfunding, and strategic partnerships.',
        'assets.collectibles': 'The Collectibles',
        'assets.collectibles.desc': 'Where passion crystallizes into value. Manage unique assets from luxury watches to limited edition collections.',

        // Asset Description
        'assets.description': 'Track and manage diverse asset classes in one unified platform. {highlight} represents a key component of modern portfolio diversification.',
        'assets.highlight.crypto': 'Digital Assets',
        'assets.highlight.forex': 'Forex',
        'assets.highlight.stocks': 'Stocks',
        'assets.highlight.cash': 'Cash',
        'assets.highlight.savings': 'Savings',
        'assets.highlight.realestate': 'Real Estate',
        'assets.highlight.alternative': 'Alternative Investments',
        'assets.highlight.collectibles': 'Collectibles',

        'footer.product': 'Product',
        'footer.company': 'Company',
        'footer.legal': 'Legal',
        'footer.copyright': 'All rights reserved.',

        // Login Page
        'login.back': '← Back to Home',
        'login.title': 'Login',
        'login.subtitle': 'Sign in and stay ahead of every market move.',
        'login.email': 'Email',
        'login.email.placeholder': 'name@example.com',
        'login.password': 'Password',
        'login.password.forgot': 'Forgot Password?',
        'login.password.placeholder': '••••••••',
        'login.remember': 'Remember Me',
        'login.submit': 'Login',
        'login.or': 'OR CONTINUE WITH',
        'login.google': 'Continue with Google',
        'login.noaccount': "Don't have an account?",
        'login.signup': 'Sign up',

        // Signup Page
        'signup.back': '← Back to Home',
        'signup.title': 'Create Account',
        'signup.subtitle': 'Join YourFin to start managing your wealth.',
        'signup.firstName': 'First Name',
        'signup.firstName.placeholder': 'John',
        'signup.lastName': 'Last Name',
        'signup.lastName.placeholder': 'Doe',
        'signup.email': 'Email',
        'signup.email.placeholder': 'name@example.com',
        'signup.phone': 'Phone Number',
        'signup.phone.placeholder': '+1 234 567 8900',
        'signup.password': 'Password',
        'signup.password.placeholder': '••••••••',
        'signup.confirmPassword': 'Confirm Password',
        'signup.confirmPassword.placeholder': '••••••••',
        'signup.dateOfBirth': 'Date of Birth (Optional)',
        'signup.age': 'Age (Optional)',
        'signup.occupation': 'Occupation (Optional)',
        'signup.occupation.placeholder': 'Software Engineer',
        'signup.submit': 'Create Account',
        'signup.or': 'OR SIGN UP WITH',
        'signup.google': 'Sign up with Google',
        'signup.hasAccount': 'Already have an account?',
        'signup.login': 'Log in',
    },
    vi: {
        'nav.features': 'Tính năng',
        'nav.assets': 'Tài sản',
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
        'features.multiasset.desc': 'Theo dõi crypto, forex, vàng và cổ phiếu Việt Nam—tất cả trong một danh mục đầu tư thống nhất.',
        'features.pl': 'Theo dõi Lãi/Lỗ',
        'features.pl.desc': 'Tính toán lãi/lỗ realtime.',
        'features.advisor': 'Tư vấn Danh mục AI',
        'features.advisor.desc': 'Đề xuất thông minh để tối ưu phân bổ danh mục đầu tư dựa trên điều kiện thị trường và hồ sơ rủi ro của bạn.',
        'features.news': 'Cập nhật Tin tức Tài sản',
        'features.news.desc': 'Luôn cập nhật với tin tức và phân tích thị trường realtime cho tất cả tài sản bạn theo dõi.',

        // Asset Types
        'assets.title': 'Theo dõi Mọi Tài sản',
        'assets.subtitle': 'Quản lý danh mục toàn diện trên tất cả các loại tài sản.',
        'assets.crypto': 'Tài sản số',
        'assets.crypto.desc': 'Khám phá tương lai của giá trị. Quản lý danh mục tiền mã hóa với bảo mật tuyệt đối và thông tin thời gian thực.',
        'assets.forex': 'Ngoại hối',
        'assets.forex.desc': 'Sức mạnh của tiền tệ toàn cầu. Theo dõi biến động tỷ giá và quản lý nguồn ngoại tệ dự phòng.',
        'assets.gold': 'Kim loại quý',
        'assets.gold.desc': 'Vịnh tránh bão vĩnh cửu. Bảo vệ giá trị tài sản trước lạm phát bằng vàng, bạc và kim loại quý hiếm.',
        'assets.stocks': 'Chứng khoán',
        'assets.stocks.desc': 'Đồng hành cùng sự tăng trưởng toàn cầu. Phân tích danh mục cổ phiếu, quỹ ETF với dữ liệu thời gian thực.',
        'assets.cash': 'Tiền mặt',
        'assets.cash.desc': 'Nguồn lực sẵn sàng cho mọi cơ hội. Theo dõi dòng tiền lưu động và tài khoản thanh toán minh bạch, tức thời.',
        'assets.savings': 'Tiết kiệm thông minh',
        'assets.savings.desc': 'Nền móng cho sự an tâm tài chính. Tối ưu hóa tiền gửi tiết kiệm với mức lãi suất tốt nhất.',
        'assets.realestate': 'Bất động sản',
        'assets.realestate.desc': 'Giá trị trường tồn theo thời gian. Số hóa danh mục nhà đất, căn hộ và dự án đầu tư dài hạn.',
        'assets.alternative': 'Đầu tư thay thế',
        'assets.alternative.desc': 'Vượt ra ngoài ranh giới truyền thống. Đa dạng hóa với cho vay P2P, góp vốn cộng đồng và đối tác chiến lược.',
        'assets.collectibles': 'Sưu tầm',
        'assets.collectibles.desc': 'Nơi đam mê kết tinh thành giá trị. Quản lý tài sản độc bản từ đồng hồ xa xỉ đến bộ sưu tập giới hạn.',

        // Asset Description
        'assets.description': 'Theo dõi và quản lý các loại tài sản đa dạng trên một nền tảng thống nhất. {highlight} là thành phần quan trọng trong danh mục đầu tư hiện đại.',
        'assets.highlight.crypto': 'Tài sản số',
        'assets.highlight.forex': 'Ngoại hối',
        'assets.highlight.stocks': 'Chứng khoán',
        'assets.highlight.cash': 'Tiền mặt',
        'assets.highlight.savings': 'Tiết kiệm',
        'assets.highlight.realestate': 'Bất động sản',
        'assets.highlight.alternative': 'Đầu tư thay thế',
        'assets.highlight.collectibles': 'Sưu tầm',

        'footer.product': 'Sản phẩm',
        'footer.company': 'Công ty',
        'footer.legal': 'Pháp lý',
        'footer.copyright': 'Mọi quyền được bảo lưu.',

        // Login Page
        'login.back': '← Quay lại Trang chủ',
        'login.title': 'Đăng nhập',
        'login.subtitle': 'Đăng nhập để luôn dẫn trước mọi nhịp thị trường.',
        'login.email': 'Email',
        'login.email.placeholder': 'ten@vidu.com',
        'login.password': 'Mật khẩu',
        'login.password.forgot': 'Quên mật khẩu?',
        'login.password.placeholder': '••••••••',
        'login.remember': 'Ghi nhớ đăng nhập',
        'login.submit': 'Đăng nhập',
        'login.or': 'HOẶC TIẾP TỤC VỚI',
        'login.google': 'Tiếp tục với Google',
        'login.noaccount': "Chưa có tài khoản?",
        'login.signup': 'Đăng ký',

        // Signup Page
        'signup.back': '← Quay lại Trang chủ',
        'signup.title': 'Tạo Tài Khoản',
        'signup.subtitle': 'Tham gia YourFin để bắt đầu quản lý tài sản của bạn.',
        'signup.firstName': 'Họ',
        'signup.firstName.placeholder': 'Nguyễn',
        'signup.lastName': 'Tên',
        'signup.lastName.placeholder': 'Văn A',
        'signup.email': 'Email',
        'signup.email.placeholder': 'ten@vidu.com',
        'signup.phone': 'Số Điện Thoại',
        'signup.phone.placeholder': '0123 456 789',
        'signup.password': 'Mật khẩu',
        'signup.password.placeholder': '••••••••',
        'signup.confirmPassword': 'Xác nhận Mật khẩu',
        'signup.confirmPassword.placeholder': '••••••••',
        'signup.dateOfBirth': 'Ngày Sinh (Tùy chọn)',
        'signup.age': 'Tuổi (Tùy chọn)',
        'signup.occupation': 'Nghề Nghiệp (Tùy chọn)',
        'signup.occupation.placeholder': 'Kỹ sư Phần mềm',
        'signup.submit': 'Tạo Tài Khoản',
        'signup.or': 'HOẶC ĐĂNG KÝ VỚI',
        'signup.google': 'Đăng ký với Google',
        'signup.hasAccount': 'Đã có tài khoản?',
        'signup.login': 'Đăng nhập',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        const trans = translations[language] as Record<string, string>;
        return trans[key] || key;
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
