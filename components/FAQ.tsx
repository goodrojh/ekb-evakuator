"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Wallet, Clock, FileText, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  price: [
    {
      question: "Сколько стоит эвакуатор по Екатеринбургу?",
      answer:
        "Легковой автомобиль — от 2 500 ₽, кроссовер или внедорожник — от 3 000 ₽, микроавтобус и коммерческий транспорт — от 3 500 ₽. В цену уже включены 10 км по городу, погрузка, крепление и разгрузка. Точную сумму называем по телефону до выезда — и она не меняется.",
    },
    {
      question: "Есть ли наценка ночью, в выходные или праздники?",
      answer: "Нет. Мы работаем круглосуточно и берём одинаково в 3 часа дня и в 3 часа ночи. Это принципиальная позиция: беда не выбирает время.",
    },
    {
      question: "Что может увеличить цену?",
      answer:
        "Только объективные вещи, о которых мы скажем заранее: километраж сверх включённого, работа лебёдкой (кювет, снег, грязь), заблокированные колёса (500 ₽ за колесо), простой дольше 30 минут по вашей вине. Никаких «за сложность» и «за срочность».",
    },
    {
      question: "Как можно оплатить?",
      answer: "Наличными, переводом на карту или картой водителю. Оплата — после того, как машина доставлена. По запросу дадим чек или закрывающие документы для юрлиц.",
    },
    {
      question: "Если я вызвал, а потом машина завелась?",
      answer: "Если вы отменили вызов до нашего выезда — бесплатно. Если мы уже приехали — берём только за ложный выезд по договорённости, обычно это минимальная сумма.",
    },
  ],
  process: [
    {
      question: "Как быстро приедете?",
      answer: `В пределах Екатеринбурга — обычно ${site.arrivalMinutes} минут. Машина дежурит в городе, а не в области. По пробкам и в снегопад можем предупредить о задержке — но всегда честно называем реальное время.`,
    },
    {
      question: "Заберёте машину, если я не могу быть рядом?",
      answer: "Да. Например, авто стоит у дома, а вы на работе. Договоримся о ключах, сделаем фото до и после погрузки и пришлём вам в мессенджер.",
    },
    {
      question: "Автомобиль на автомате или с заблокированными колёсами — справитесь?",
      answer: "Да. У нас сдвижная платформа и лебёдка: машина закатывается на платформу, а не буксируется. Для заблокированных колёс используем подкатные тележки.",
    },
    {
      question: "Возите по области и в другие города?",
      answer: "Да: Свердловская область, Челябинск, Тюмень, Пермь, Курган и дальше. Считаем по километражу — 50 ₽/км, дорога в обе стороны обсуждается заранее.",
    },
    {
      question: "Работаете с автосалонами и сервисами?",
      answer: "Да, регулярно возим новые автомобили для дилерских центров и машины на ТО. Для постоянных партнёров — договор и отсрочка.",
    },
  ],
  docs: [
    {
      question: "Какие документы нужны для эвакуации?",
      answer: "Для вызова — ничего. При погрузке водитель попросит показать СТС или ПТС, чтобы убедиться, что машину увозит владелец или человек с его ведома. Если документов нет — заранее скажите, решим.",
    },
    {
      question: "Кто отвечает за машину во время перевозки?",
      answer: "Мы. За 15 лет — ни одной повреждённой машины, и мы этим дорожим. Делаем фото до и после погрузки, чтобы обе стороны были спокойны.",
    },
    {
      question: "Можете забрать машину со штрафстоянки?",
      answer: "Да. Нужны документы на автомобиль и разрешение на выдачу из ГИБДД. Подскажем, как их получить, и приедем к назначенному времени.",
    },
    {
      question: "Эвакуация после ДТП — нужно ли ждать ГИБДД?",
      answer: "Если оформляете европротокол — можно грузить сразу после фото. Если приезжает ГИБДД — ждём оформления и увозим. Простой во время оформления — 30 минут бесплатно, дальше по договорённости.",
    },
  ],
};

const tabs = [
  { id: "price", label: "Цены и оплата", icon: <Wallet className="h-4 w-4" /> },
  { id: "process", label: "Процесс", icon: <Clock className="h-4 w-4" /> },
  { id: "docs", label: "Документы", icon: <FileText className="h-4 w-4" /> },
];

export default function FAQ() {
  const { open } = useLead();
  const [activeTab, setActiveTab] = useState("price");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setOpenIndex(0);
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Object.values(faqData)
      .flat()
      .map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
  };

  return (
    <section id="faq" className="bg-night py-20 md:py-[120px] px-5 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-[820px] mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-amber mb-4">
            <span className="w-2 h-2 rounded-full bg-amber" /> Вопросы
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-3">Всё, что обычно спрашивают по телефону</h2>
          <p className="text-white/60 text-base">Чтобы вы знали ответы ещё до звонка.</p>
        </div>

        <div className="flex justify-center gap-1 border-b border-white/10 mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={
                "inline-flex items-center gap-2 px-4 md:px-5 py-3 text-[14px] md:text-[15px] transition-all border-b-2 whitespace-nowrap -mb-px " +
                (activeTab === tab.id ? "text-amber font-bold border-amber" : "text-white/50 font-medium border-transparent hover:text-white")
              }
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {faqData[activeTab].map((item, index) => (
            <div key={item.question} className="border-b border-white/10 py-5">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center gap-4 text-left group"
              >
                <span className={"text-[16px] md:text-[17px] font-semibold transition-colors " + (openIndex === index ? "text-amber" : "text-white group-hover:text-amber")}>
                  {item.question}
                </span>
                <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 shrink-0 transition-colors group-hover:border-amber group-hover:text-amber">
                  {openIndex === index ? <X size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key={"a" + index}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" as const }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pr-12 text-[15px] text-white/65 leading-[1.7]">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-graphite border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-amber/15 border border-amber/40 flex items-center justify-center">
              <Phone className="h-5 w-5 text-amber" />
            </span>
            <div>
              <p className="font-bold text-[15px]">Не нашли ответ?</p>
              <p className="text-[14px] text-white/55">Спросите голосом — это быстрее, чем читать</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <a href={site.phoneHref} className="flex-1 md:flex-none rounded-full bg-amber text-ink px-6 py-3.5 text-[15px] font-bold text-center hover:bg-amber-deep transition-colors">
              Позвонить
            </a>
            <button
              onClick={() => open({ source: "faq", title: "Задать вопрос и вызвать" })}
              className="flex-1 md:flex-none rounded-full border border-white/15 px-6 py-3.5 text-[15px] font-bold hover:bg-white/5 transition-colors"
            >
              Перезвоните мне
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
