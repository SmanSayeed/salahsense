"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const { t, i18n } = useTranslation()

  const renderBanglaContent = () => (
    <div className="prose prose-emerald max-w-none">
      <h1 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-6">নামাজের বোধ সম্পর্কে</h1>
      <p className="mb-6">নামাজের বোধ একটি ইসলামী অ্যাপ, যা মুসলিমদের নামাজের শিক্ষা ও অনুশীলনকে আরও সহজ ও অর্থপূর্ণ করার জন্য তৈরি করা হয়েছে। আমাদের লক্ষ্য হলো নামাজের কালাম, দোয়া, নিয়ত, এবং প্রকারভেদ সম্পর্কে সঠিক জ্ঞান প্রদান করা, যাতে প্রত্যেক মুসলিম তাদের ইবাদতকে আরও নিখুঁত করতে পারেন।</p>

      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mt-8 mb-4">আমাদের বৈশিষ্ট্য</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>নামাজের কালাম ও দোয়া: আরবি, বাংলা, এবং ইংরেজিতে নামাজের দোয়া, তাফসীর, এবং অডিও সহ।</li>
        <li>নামাজের নিয়ত: বিভিন্ন নামাজের জন্য সঠিক নিয়ত বাংলা ও ইংরেজিতে।</li>
        <li>নামাজের প্রকারভেদ: ফরজ, সুন্নত, নফল, এবং বিশেষ নামাজের বিস্তারিত।</li>
        <li>দৈনন্দিন ও বিশেষ দোয়া: রমজান, হজ্জ, ঈদ, এবং জিকির-তাসবীহ সহ।</li>
        <li>বহুভাষিক সমর্থন: বাংলা ও ইংরেজি ভাষায় সহজে বোঝার জন্য উপস্থাপন।</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mt-8 mb-4">আমাদের উদ্দেশ্য</h2>
      <p className="mb-6">নামাজ ইসলামের মূল স্তম্ভগুলোর একটি, এবং আমরা বিশ্বাস করি যে সঠিক জ্ঞান ও অনুশীলনের মাধ্যমে প্রত্যেক মুসলিম আল্লাহর সাথে তাদের আধ্যাত্মিক সংযোগ গভীর করতে পারেন। নামাজের বোধ বিশেষভাবে বাংলাভাষী মুসলিমদের জন্য ডিজাইন করা হয়েছে, যাতে তারা তাদের মাতৃভাষায় নামাজের শিক্ষা গ্রহণ করতে পারেন।</p>

      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mt-8 mb-4">আমাদের দৃষ্টিভঙ্গি</h2>
      <p className="mb-6">আমরা চাই নামাজের বোধ বিশ্বব্যাপী মুসলিমদের জন্য একটি নির্ভরযোগ্য সঙ্গী হয়ে উঠুক, যা তাদের দৈনন্দিন ইবাদতকে সমৃদ্ধ করবে এবং আল্লাহর নৈকট্য লাভে সহায়তা করবে। আপনার প্রতিক্রিয়া ও পরামর্শ আমাদের কাছে অমূল্য, তাই আমাদের সাথে যোগাযোগ করুন এবং নামাজের বোধের এই যাত্রায় আমাদের সাথে থাকুন!</p>
    </div>
  )

  const renderEnglishContent = () => (
    <div className="prose prose-emerald max-w-none">
      <h1 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-6">About SalahSense</h1>
      <p className="mb-6">SalahSense is an Islamic app designed to make learning and practicing Salah easier and more meaningful for Muslims. Our mission is to provide accurate knowledge about Salah supplications, intentions, types, and related prayers, enabling every Muslim to perfect their worship.</p>

      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mt-8 mb-4">Our Features</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Salah Supplications: Prayers and duas in Arabic, Bangla, and English, with tafsir and audio support.</li>
        <li>Salah Intentions: Correct intentions for various prayers in Bangla and English.</li>
        <li>Types of Salah: Detailed information on Fard, Sunnah, Nafl, and special prayers.</li>
        <li>Daily and Special Duas: Supplications for Ramadan, Hajj, Eid, and Dhikr-Tasbih.</li>
        <li>Multilingual Support: Presented in Bangla and English for easy understanding.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mt-8 mb-4">Our Purpose</h2>
      <p className="mb-6">Salah is one of the core pillars of Islam, and we believe that with the right knowledge and practice, every Muslim can deepen their spiritual connection with Allah. SalahSense is specially crafted for Bengali-speaking Muslims, allowing them to learn about Salah in their native language.</p>

      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mt-8 mb-4">Our Vision</h2>
      <p className="mb-6">We aim for SalahSense to become a trusted companion for Muslims worldwide, enriching their daily worship and helping them grow closer to Allah. Your feedback and suggestions are invaluable to us, so please reach out and join us on this journey with SalahSense!</p>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6 md:p-8">
            {i18n.language === "bn" ? renderBanglaContent() : renderEnglishContent()}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 