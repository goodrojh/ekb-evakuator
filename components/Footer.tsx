"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, Send, MessageCircle } from "lucide-react";
import { site, asset } from "@/lib/site";
import { useLead } from "@/components/LeadModal";
import Logo from "@/components/Logo";

export default function Footer() {
  const { open } = useLead();
  return (
    <section className="w-full bg-night pb-24 md:pb-2">
      <div className="m-2 rounded-[24px] overflow-hidden relative min-h-[640px] md:min-h-[760px] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src={asset("/img/cta.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/20 to-night/90" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-20 pb-10 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-[12px] font-bold uppercase tracking-wide mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-live live-dot" /> Сейчас на линии
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[40px] sm:text-[56px] md:text-[80px] font-bold text-white leading-[0.98] tracking-[-0.02em]"
          >
            Застряли?
            <br />
            <span className="text-amber">Уже едем.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 text-white/75 text-base md:text-lg max-w-[520px]"
          >
            Один звонок — и через {site.arrivalMinutes} минут эвакуатор рядом. Цена по телефону — финальная.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 w-full max-w-[640px]"
          >
            <a
              href={site.phoneHref}
              className="flex-1 h-16 rounded-full bg-amber text-ink font-display font-bold text-lg md:text-xl flex items-center justify-center gap-3 hover:bg-amber-deep transition-all hover:scale-[1.02] shadow-[0_12px_50px_rgba(255,176,32,0.4)]"
            >
              <Phone className="h-5 w-5" /> {site.phoneDisplay}
            </a>
            <button
              onClick={() => open({ source: "footer", title: "Перезвоните мне" })}
              className="h-16 px-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/25 transition-colors"
            >
              Перезвоните мне
            </button>
          </motion.div>

          <div className="mt-5 flex items-center gap-3">
            <a href={site.telegram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-[13px] font-semibold hover:bg-white/20 transition-colors">
              <Send className="h-4 w-4" /> Telegram
            </a>
            <a href={site.max} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-[13px] font-semibold hover:bg-white/20 transition-colors">
              <MessageCircle className="h-4 w-4" /> MAX
            </a>
            {site.whatsapp && (
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-[13px] font-semibold hover:bg-white/20 transition-colors">
                WhatsApp
              </a>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[20px] mx-3 md:mx-5 mb-3 md:mb-5 p-6 md:p-8 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:flex md:flex-row justify-between gap-8">
            <div className="col-span-2 md:w-[34%]">
              <Logo />
              <p className="mt-3 text-white/60 text-[13px] leading-relaxed max-w-[280px]">
                Круглосуточный эвакуатор в Екатеринбурге и Свердловской области. Своя машина, {site.yearsExperience} лет за рулём, честная цена.
              </p>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-3">Услуги</h4>
              <ul className="space-y-1.5">
                {["Эвакуатор легковых авто", "Эвакуатор внедорожников", "Коммерческий транспорт", "Спецтехника", "Межгород"].map((l) => (
                  <li key={l}>
                    <a href="#situations" className="text-white/60 text-[13px] hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-3">Разделы</h4>
              <ul className="space-y-1.5">
                {[
                  ["Цены", "#prices"],
                  ["Как работаем", "#how"],
                  ["Машина", "#fleet"],
                  ["Вопросы", "#faq"],
                ].map(([l, h]) => (
                  <li key={h}>
                    <a href={h} className="text-white/60 text-[13px] hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-3">Контакты</h4>
              <ul className="space-y-1.5 text-[13px]">
                <li>
                  <a href={site.phoneHref} className="text-white font-bold hover:text-amber transition-colors">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="text-white/60">Екатеринбург, 24/7</li>
                <li>
                  <a href={site.telegram} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[12px] text-white/45">
            <span>© {new Date().getFullYear()} {site.name}. Работаем по Екатеринбургу и области.</span>
            <span>Цены на сайте — ориентировочные, не являются публичной офертой. Точная цена — по телефону.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
