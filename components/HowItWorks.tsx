"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { PhoneCall, Navigation, PackageCheck, Phone } from "lucide-react";
import { site, asset } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export default function HowItWorks() {
  const { open } = useLead();
  return (
    <section id="how" className="w-full px-5 md:px-8 py-20 md:py-[120px] bg-paper text-ink relative overflow-hidden">
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto mb-14 md:mb-20 relative z-10"
      >
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-amber-deep mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-deep" /> Как это работает
        </span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] max-w-3xl">
          От звонка до доставки —<br />
          <span className="text-muted">три шага и один таймер.</span>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto relative z-10"
      >
        {/* STEP 01 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6 group">
          <div className="rounded-[24px] overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={asset("/img/step-call.jpg")} alt="Звонок с дороги" loading="lazy" className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-full bg-white/15 backdrop-blur-2xl rounded-[18px] border border-white/30 p-4 flex flex-col gap-2 shadow-2xl"
              >
                <div className="bg-white rounded-[12px] px-3 py-2.5 flex items-center gap-3 shadow-xl relative overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity as number, ease: "linear" as const }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-amber/25 to-transparent -skew-x-12 pointer-events-none"
                  />
                  <div className="w-9 h-9 rounded-[10px] bg-amber/15 flex items-center justify-center shrink-0">
                    <PhoneCall className="h-4 w-4 text-amber-deep" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold leading-none mb-1">Исходящий вызов</span>
                    <span className="text-[10px] text-muted leading-none">{site.phoneDisplay} · 00:07</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {["ДТП", "Не заводится", "Застрял"].map((t, i) => (
                    <span key={t} className={"rounded-[8px] px-2.5 py-1.5 text-[10px] font-bold " + (i === 1 ? "bg-amber text-ink" : "bg-white/70 text-ink")}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-amber-deep text-xs font-bold px-3 py-1 border border-amber-deep">
              Шаг 01 · 30 секунд
            </span>
            <h3 className="font-display text-2xl font-bold leading-tight">Звоните или оставляете номер</h3>
            <p className="text-base text-muted leading-relaxed">
              Говорите, где вы и что с машиной. Сразу называем цену и время подачи. Без операторов-посредников — вы говорите с тем, кто приедет.
            </p>
          </div>
        </motion.div>

        {/* STEP 02 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6 group">
          <div className="rounded-[24px] overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={asset("/img/step-arrive.jpg")} alt="Эвакуатор приезжает" loading="lazy" className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-full bg-white/15 backdrop-blur-2xl rounded-[18px] border border-white/30 p-4 flex items-center justify-between shadow-2xl"
              >
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity as number, ease: "easeInOut" as const }}
                    className="w-3 h-3 rounded-full bg-amber shadow-[0_0_15px_#ffb020] z-10"
                  />
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{ scale: [0.2, 1.8], opacity: [0, 0.6, 0] }}
                      transition={{ duration: 4, repeat: Infinity as number, ease: "easeOut" as const, delay: i * 0.9 }}
                      className="absolute border border-white/50 rounded-full w-full h-full"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="bg-white rounded-[8px] px-3 py-2 shadow-xl flex items-center gap-2">
                    <Navigation className="h-3.5 w-3.5 text-amber-deep" />
                    <span className="text-[11px] font-bold">В пути · 4,2 км</span>
                  </div>
                  <div className="bg-amber rounded-[8px] px-3 py-2 shadow-xl">
                    <span className="text-[11px] font-bold text-ink">Прибытие ~ 11 мин</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-amber-deep text-xs font-bold px-3 py-1 border border-amber-deep">
              Шаг 02 · {site.arrivalMinutes} минут
            </span>
            <h3 className="font-display text-2xl font-bold leading-tight">Выезжаем сразу</h3>
            <p className="text-base text-muted leading-relaxed">
              Машина дежурит в городе, а не «где-то в области». Пока едем — вы получаете номер водителя и можете уточнить детали.
            </p>
          </div>
        </motion.div>

        {/* STEP 03 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6 group">
          <div className="rounded-[24px] overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={asset("/img/step-load.jpg")} alt="Крепление автомобиля" loading="lazy" className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end justify-center p-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full bg-white/15 backdrop-blur-2xl rounded-[18px] border border-white/30 p-3 flex flex-col gap-2 shadow-2xl"
              >
                {[
                  { t: "Сдвижная платформа", ok: true },
                  { t: "4 ремня + противооткаты", ok: true },
                  { t: "Фото до и после погрузки", ok: true },
                ].map((r, i) => (
                  <motion.div
                    key={r.t}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-white rounded-[10px] px-3 py-2 flex items-center gap-2 shadow"
                  >
                    <PackageCheck className="h-3.5 w-3.5 text-amber-deep" />
                    <span className="text-[11px] font-bold">{r.t}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-amber-deep text-xs font-bold px-3 py-1 border border-amber-deep">
              Шаг 03 · оплата после
            </span>
            <h3 className="font-display text-2xl font-bold leading-tight">Грузим бережно, довозим, берём оплату</h3>
            <p className="text-base text-muted leading-relaxed">
              Сдвижная платформа — авто закатывается, а не тащится. Крепим ремнями, довозим до сервиса, стоянки или дома. Платите, когда машина на месте.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 relative z-10"
      >
        <a
          href={site.phoneHref}
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-amber text-ink shadow-xl shadow-amber/25 hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Phone className="h-4 w-4" /> Позвонить
        </a>
        <button
          onClick={() => open({ source: "how", title: "Заказать эвакуатор" })}
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-ink border border-ink/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Заказать обратный звонок
        </button>
      </motion.div>
    </section>
  );
}
