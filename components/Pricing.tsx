"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Info, Lock, Route, Car } from "lucide-react";
import { vehicleTypes, pricing } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₽";

export default function Pricing() {
  const { open } = useLead();
  const [vehicle, setVehicle] = useState(vehicleTypes[0].id);
  const [km, setKm] = useState(12);
  const [intercity, setIntercity] = useState(false);
  const [winch, setWinch] = useState(false);
  const [blocked, setBlocked] = useState(0);

  const v = vehicleTypes.find((x) => x.id === vehicle)!;

  const estimate = useMemo(() => {
    let total = v.from;
    if (intercity) total += km * pricing.intercityKmRate;
    else total += Math.max(0, km - pricing.cityIncludedKm) * pricing.cityKmRate;
    if (winch) total += pricing.winch;
    total += blocked * pricing.blockedWheel;
    return Math.round(total / 50) * 50;
  }, [v, km, intercity, winch, blocked]);

  const maxKm = intercity ? 400 : 60;

  return (
    <section id="prices" className="w-full px-5 md:px-8 py-20 md:py-[120px] bg-night relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-amber/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Левая колонка — прайс */}
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-5xl font-bold leading-[1.05]"
            >
              Цена, которую назвали
              <br />
              <span className="text-amber">по телефону — финальная.</span>
            </motion.h2>
            <p className="mt-4 text-white/65 text-lg max-w-xl">
              Никаких «доплатить за ночь», «за погрузку», «за сложность». Считаем один раз, до выезда.
            </p>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-graphite overflow-hidden">
              {vehicleTypes.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setVehicle(t.id)}
                  className={
                    "w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left transition-colors " +
                    (i > 0 ? "border-t border-white/8 " : "") +
                    (vehicle === t.id ? "bg-amber/8" : "hover:bg-white/3")
                  }
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={
                        "w-10 h-10 rounded-xl flex items-center justify-center border transition-colors " +
                        (vehicle === t.id ? "bg-amber text-ink border-amber" : "bg-white/5 border-white/10 text-white/60")
                      }
                    >
                      <Car className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-semibold text-[14px] md:text-base leading-tight">{t.label}</div>
                      <div className="text-[12px] text-white/45">{t.note}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display font-bold text-[15px] sm:text-lg md:text-xl whitespace-nowrap">от {fmt(t.from)}</div>
                    <div className="hidden sm:block text-[11px] text-white/45">по городу, {pricing.cityIncludedKm} км включено</div>
                  </div>
                </button>
              ))}
              <div className="border-t border-white/8 px-5 md:px-6 py-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-white/60">
                <span>По области и межгород</span>
                <span className="text-right text-white">{pricing.intercityKmRate} ₽/км</span>
                <span>Каждый км сверх {pricing.cityIncludedKm} по городу</span>
                <span className="text-right text-white">{pricing.cityKmRate} ₽/км</span>
                <span>Работа лебёдкой (кювет, снег)</span>
                <span className="text-right text-white">{fmt(pricing.winch)}</span>
                <span>Заблокированное колесо</span>
                <span className="text-right text-white">{fmt(pricing.blockedWheel)} / шт</span>
                <span>Ночь, выходные, праздники</span>
                <span className="text-right text-live font-semibold">без наценки</span>
                <span>Простой</span>
                <span className="text-right text-white">30 мин бесплатно</span>
              </div>
            </div>
          </div>

          {/* Правая колонка — калькулятор */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 lg:sticky lg:top-28"
          >
            <div className="rounded-[28px] bg-paper text-ink p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div className="hazard-stripe absolute top-0 inset-x-0 h-1.5" />
              <div className="flex items-center justify-between gap-4 mt-1">
                <h3 className="font-display text-lg md:text-2xl font-bold">Предварительный расчёт</h3>
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wide bg-ink text-white rounded-full px-3 py-1.5 shrink-0 whitespace-nowrap">
                  {v.short}
                </span>
              </div>

              <div className="mt-6 flex gap-2 p-1 rounded-full bg-paper-2">
                {[
                  { id: false, label: "По городу" },
                  { id: true, label: "Область / межгород" },
                ].map((o) => (
                  <button
                    key={String(o.id)}
                    onClick={() => {
                      setIntercity(o.id);
                      setKm(o.id ? 80 : 12);
                    }}
                    className={
                      "flex-1 rounded-full py-2.5 text-[13px] font-bold transition-all " +
                      (intercity === o.id ? "bg-ink text-white shadow" : "text-muted hover:text-ink")
                    }
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <Route className="h-4 w-4 text-amber-deep" /> Расстояние
                  </span>
                  <span className="font-display font-bold text-lg">{km} км</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={maxKm}
                  value={km}
                  onChange={(e) => setKm(Number(e.target.value))}
                  className="mt-3 w-full accent-amber h-2 cursor-pointer"
                  aria-label="Расстояние в километрах"
                />
                <div className="flex justify-between text-[11px] text-muted mt-1">
                  <span>1 км</span>
                  <span>{maxKm} км</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3 cursor-pointer">
                  <input type="checkbox" checked={winch} onChange={(e) => setWinch(e.target.checked)} className="accent-amber w-4 h-4" />
                  <span className="text-[13px] font-semibold">Нужна лебёдка (кювет, снег, грязь)</span>
                </label>
                <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white px-4 py-2.5">
                  <span className="text-[13px] font-semibold">Колёса заблокированы</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBlocked(Math.max(0, blocked - 1))}
                      className="w-7 h-7 rounded-full bg-paper-2 font-bold hover:bg-amber transition-colors"
                      aria-label="Меньше"
                    >
                      −
                    </button>
                    <span className="w-4 text-center font-bold">{blocked}</span>
                    <button
                      onClick={() => setBlocked(Math.min(4, blocked + 1))}
                      className="w-7 h-7 rounded-full bg-paper-2 font-bold hover:bg-amber transition-colors"
                      aria-label="Больше"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-ink text-white p-5 flex items-end justify-between gap-4">
                <div>
                  <div className="text-[12px] text-white/50 uppercase tracking-wide font-bold">Ориентировочно</div>
                  <motion.div
                    key={estimate}
                    initial={{ opacity: 0.4, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-3xl sm:text-4xl md:text-[44px] font-bold leading-none mt-1 whitespace-nowrap"
                  >
                    ≈ {fmt(estimate)}
                  </motion.div>
                </div>
                <div className="text-right text-[11px] text-white/50 leading-snug max-w-[140px]">
                  Точную сумму зафиксируем по телефону за 1 минуту
                </div>
              </div>

              <button
                onClick={() =>
                  open({
                    source: "calculator",
                    title: "Зафиксировать цену",
                    vehicle: v.label,
                    note: `${intercity ? "межгород" : "по городу"}, ${km} км${winch ? ", лебёдка" : ""}${blocked ? `, блок. колёс: ${blocked}` : ""} · расчёт ≈ ${fmt(estimate)}`,
                  })
                }
                className="mt-4 w-full rounded-full bg-amber text-ink font-bold py-4 flex items-center justify-center gap-2 hover:bg-amber-deep transition-all active:scale-[0.98] shadow-[0_10px_40px_rgba(255,176,32,0.3)]"
              >
                <Lock className="h-4 w-4" /> Зафиксировать эту цену
              </button>

              <ul className="mt-5 space-y-2">
                {[
                  "Оплата после доставки — наличными, переводом или картой",
                  "Погрузка, крепление и разгрузка уже включены",
                  "Если вы отменили вызов до выезда — бесплатно",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[13px] text-ink/70">
                    <Check className="h-4 w-4 text-amber-deep shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-[11px] text-muted">
                <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                Расчёт ориентировочный: для нестандартных случаев (сильные повреждения, подъём из ямы, крупная техника) цену уточним по телефону.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
