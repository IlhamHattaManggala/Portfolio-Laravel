import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Head } from '@inertiajs/react';
import FloatingTerminal from "@/components/terminal/FloatingTerminal";
import { useTranslation } from "react-i18next";

export default function FAQPage() {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4")
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Head title={`FAQ | Ilham Hatta Manggala`} />
      <Navbar />
      <main className="flex-grow pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("faq.title_1")} <span className="text-primary">{t("faq.title_2")}</span>
            </h1>
            <p className="text-gray-400 text-lg">{t("faq.subtitle")}</p>
          </div>

          <div className="grid gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-8 bg-white/[0.02] rounded-3xl border border-white/10 hover:bg-white/[0.04] transition-all group">
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingTerminal />
    </div>
  );
}
