"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Calculator, ShieldCheck, Wallet, Clock } from "lucide-react";
import { site, asset } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

function useClock() {
  const [t, setT] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setT(
        new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Yekaterinburg" }),
      );
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Hero() {
  const { open } = useLead();
  const videoRef = useRef<HTMLVideoElement>(null);
  const time = useClock();

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.85;
  }, []);

  return (
    <section id="top" className="min-h-[100svh] md:min-h-[105vh] flex flex-col bg-night relative w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={asset("/img/hero.jpg")}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={asset("/video/hero.mp4")} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-night/70 via-night/30 to-night" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-night/60 via-transparent to-transparent" />

      <div className="relative flex-1 flex flex-col justify-end md:justify-center px-5 md:px-8 pt-[110px] pb-24 md:pb-20 z-10">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full bg-white/8 backdrop-blur-xl border border-white/15 pl-2 pr-4 py-1.5 mb-6"
          >
            <span className="flex items-center gap-2 rounded-full bg-live/15 px-2.5 py-1 text-[12px] font-bold text-live whitespace-nowrap shrink-0">
              <span className="w-2 h-2 rounded-full bg-live live-dot" /> На линии
            </span>
            <span className="text-[12px] sm:text-[13px] text-white/80 leading-snug">
              {time ? `Сейчас ${time}` : "Круглосуточно"} · машина через {site.arrivalMinutes} мин
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display font-bold text-[34px] leading-[1.02] sm:text-5xl md:text-6xl lg:text-[76px] text-white max-w-4xl"
          >
            Эвакуатор <span className="text-amber">приедет</span>
            <br />
            за {site.arrivalMinutes} минут.
            <br />
            <span className="text-white/70">В любое время.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 text-base md:text-lg text-white/80 max-w-[560px] leading-relaxed"
          >
            Екатеринбург и область, 24/7. Назовём точную цену по телефону и не изменим её на месте.
            Оплата — после того, как машина доставлена.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a
              href={site.phoneHref}
              className="group relative rounded-full px-14 py-4 text-[17px] font-bold bg-amber text-ink flex items-center justify-center hover:bg-amber-deep transition-all hover:scale-[1.03] active:scale-95 shadow-[0_12px_50px_rgba(255,176,32,0.35)]"
            >
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/10 flex items-center justify-center">
                <Phone className="h-4.5 w-4.5" />
              </span>
              {site.phoneDisplay}
            </a>
            <button
              onClick={() => open({ source: "hero", title: "Рассчитать стоимость и вызвать" })}
              className="rounded-full px-7 py-4 text-[16px] font-semibold bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Calculator className="h-4.5 w-4.5" />
              Узнать точную цену
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl"
          >
            {[
              { icon: Wallet, big: "от 2 500 ₽", small: "фиксируем цену по телефону" },
              { icon: Clock, big: "24 / 7", small: "ночью и в праздники — без наценки" },
              { icon: ShieldCheck, big: `${site.yearsExperience} лет`, small: "погрузка без царапин и вмятин" },
              { icon: Phone, big: "Оплата после", small: "наличные, перевод, карта" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 px-4 py-3.5 flex flex-col gap-1"
              >
                <div className="flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-amber hidden sm:block shrink-0" />
                  <span className="font-display font-bold text-[14px] md:text-lg leading-tight">{s.big}</span>
                </div>
                <span className="text-[12px] text-white/60 leading-snug">{s.small}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Бегущая аварийная лента */}
      <div className="relative z-10 border-y border-amber/30 bg-night/70 backdrop-blur-md overflow-hidden py-2.5">
        <div className="marquee flex whitespace-nowrap w-max">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-8 pr-8 text-[13px] font-semibold tracking-wide uppercase text-amber/90">
              {[
                "ДТП",
                "не заводится",
                "застряли в снегу",
                "спустило колесо",
                "перевозка в сервис",
                "межгород",
                "коммерческий транспорт",
                "спецтехника",
                "эвакуация со штрафстоянки",
                "доставка из автосалона",
              ].map((w) => (
                <span key={w} className="flex items-center gap-8">
                  {w} <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
