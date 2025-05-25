import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  bn: {
    translation: {
      app: {
        name: "নামাজের জ্ঞান",
      },
      nav: {
        home: "হোম",
        categories: "ক্যাটেগরি",
        about: "সম্পর্কে",
      },
      header: {
        reportMistakes: "ভুল রিপোর্ট করুন",
        clearCache: "ক্যাশ মুছুন",
        reload: "রিলোড করুন"
      },
      hero: {
        title: "নামাজের জ্ঞান",
        description: "আরবি, বাংলা এবং ইংরেজিতে তাকবীর, দোয়া এবং কালামের সম্পূর্ণ গাইড",
      },
      filter: {
        title: "খুঁজুন ও ফিল্টার করুন",
        description: "আপনার প্রয়োজনীয় দোয়া ও কালাম খুঁজে নিন",
        category: "ক্যাটেগরি",
        categoryPlaceholder: "ক্যাটেগরি খুঁজুন...",
        topic: "বিষয়",
        topicPlaceholder: "বিষয় খুঁজুন...",
        results: "অনুসন্ধানের ফলাফল",
      },
      featured: {
        title: "বিশেষ নির্বাচিত",
        description: "গুরুত্বপূর্ণ দোয়া ও কালাম",
      },
      categories: {
        title: "ক্যাটেগরি অনুযায়ী ব্রাউজ করুন",
        description: "বিভিন্ন ক্যাটেগরি থেকে দোয়া ও কালাম দেখুন",
        browse: "ক্যাটেগরি ব্রাউজ করুন",
        viewAll: "সব দেখুন",
        seeAll: "আরো দেখুন",
      },
      topic: {
        playAudio: "অডিও চালান",
        pauseAudio: "অডিও বন্ধ করুন",
        copyArabic: "আরবি কপি করুন",
        copyBangla: "বাংলা কপি করুন",
        copyEnglish: "ইংরেজি কপি করুন",
        copied: "কপি হয়েছে!",
        share: "শেয়ার করুন",
        bookmark: "বুকমার্ক করুন",
        bookmarked: "বুকমার্ক করা হয়েছে",
        previous: "পূর্ববর্তী",
        next: "পরবর্তী",
        back: "ফিরে যান",
        details: "বিস্তারিত",
        arabic: "আরবি",
        translation: "অনুবাদ",
        audio: "অডিও",
      },
      audio: {
        speed: "গতি",
        normal: "স্বাভাবিক",
        slow: "ধীর",
        fast: "দ্রুত",
      },
      footer: {
        about: "সম্পর্কে",
        privacy: "গোপনীয়তা নীতি",
        contact: "যোগাযোগ",
        terms: "শর্তাবলী",
        madeWith: "তৈরি করা হয়েছে",
        forUmmah: "উম্মাহর জন্য",
      },
      pwa: {
        install: "অ্যাপ ইনস্টল করুন",
        installPrompt: "এই অ্যাপটি আপনার ডিভাইসে ইনস্টল করুন",
        installButton: "ইনস্টল করুন",
        later: "পরে",
      },
      language: {
        bangla: "বাংলা",
        english: "English",
      },
    },
  },
  en: {
    translation: {
      app: {
        name: "Salah Sense",
      },
      nav: {
        home: "Home",
        categories: "Categories",
        about: "About",
      },
      hero: {
        title: "Salah Sense",
        description: "Complete guide to Takbir, Duas, and Kalams in Arabic, Bangla, and English",
      },
      header: {
        reportMistakes: "Report mistakes",
        clearCache: "Clear cache",
        reload: "Reload"
      },
      filter: {
        title: "Search & Filter",
        description: "Find the prayers and recitations you need",
        category: "Category",
        categoryPlaceholder: "Search categories...",
        topic: "Topic",
        topicPlaceholder: "Search topics...",
        results: "Search Results",
      },
      featured: {
        title: "Featured",
        description: "Important prayers and recitations",
      },
      categories: {
        title: "Browse by Categories",
        description: "Explore prayers and recitations by category",
        browse: "Browse Categories",
        viewAll: "View All",
        seeAll: "See All",
      },
      topic: {
        playAudio: "Play Audio",
        pauseAudio: "Pause Audio",
        copyArabic: "Copy Arabic",
        copyBangla: "Copy Bangla",
        copyEnglish: "Copy English",
        copied: "Copied!",
        share: "Share",
        bookmark: "Bookmark",
        bookmarked: "Bookmarked",
        previous: "Previous",
        next: "Next",
        back: "Back",
        details: "Details",
        arabic: "Arabic",
        translation: "Translation",
        audio: "Audio",
      },
      audio: {
        speed: "Speed",
        normal: "Normal",
        slow: "Slow",
        fast: "Fast",
      },
      footer: {
        about: "About",
        privacy: "Privacy Policy",
        contact: "Contact",
        terms: "Terms",
        madeWith: "Made with",
        forUmmah: "for the Ummah",
      },
      pwa: {
        install: "Install App",
        installPrompt: "Install this app on your device",
        installButton: "Install",
        later: "Later",
      },
      language: {
        bangla: "বাংলা",
        english: "English",
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "bn",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
