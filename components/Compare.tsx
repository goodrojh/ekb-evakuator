"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { site } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

type Cell = "yes" | "no" | "maybe" | string;

const rows: { label: string; us: Cell; dispatcher: Cell; random: Cell }[] = [
  { label: "Цена фиксируется до выезда", us: "yes", dispatcher: "maybe", random: "no" },
  { label: "Говорите напрямую с водителем", us: "yes", dispatcher: "no", random: "yes" },
  { label: "Наценка ночью и в праздники", us: "нет", dispatcher: "+30–50 %", random: "как повезёт" },
  { label: "Оплата после доставки", us: "yes", dispatcher: "maybe", random: "no" },
  { label: "Сдвижная платформа (без волочения)", us: "yes", dispatcher: "maybe", random: "maybe" },
  { label: "Фото до и после погрузки", us: "yes", dispatcher: "no", random: "no" },
  { label: "Отмена до выезда — бесплатно", us: "yes", dispatcher: "maybe", random: "maybe" },
  { label: "Понятно, кто отвечает за машину", us: "yes", dispatcher: "no", random: "maybe" },
];

function CellView({ v, strong }: { v: Cell; strong?: boolean }) {
  if (v === "yes")
    return (
      <span className={"inline-flex w-7 h-7 rounded-full items-center justify-center " + (strong ? "bg-amber text-ink" : "bg-live/15 text-live")}>
        <Check className="h-4 w-4 stroke-[3]" />
      </span>
    );
  if (v === "no")
    return (
      <span className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-signal/15 text-signal">
        <X className="h-4 w-4 stroke-[3]" />
      </span>
    );
  if (v === "maybe")
    return (
      <span className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-white/10 text-white/50">
        <Minus className="h-4 w-4 stroke-[3]" />
      </span>
    );
  return <span className={"text-[13px] font-semibold " + (strong ? "text-amber" : "text-white/70")}>{v}</span>;
}

export default function Compare() {
  const { open } = useLead();
  return (
    <section className="w-full px-5 md:px-8 py-20 md:py-[120px] bg-graphite relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[32px] md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-[1.05]">
              Чем мы отличаемся
              <br />
              <span className="text-white/60">от «первого номера из поиска».</span>
            </h2>
            <p className="mt-4 text-white/65 text-lg">
              В момент, когда машина стоит на обочине, вы не должны разбираться, кто приедет и сколько это будет стоить на самом деле.
            </p>
            <button
              onClick={() => open({ source: "compare", title: "Вызвать эвакуатор" })}
              className="mt-8 rounded-full px-7 py-3.5 text-sm font-bold bg-amber text-ink hover:bg-amber-deep transition-colors"
            >
              Вызвать {site.name}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 rounded-[28px] border border-white/10 bg-night overflow-hidden"
          >
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr_1fr] text-[11px] md:text-[12px] font-bold uppercase tracking-wide border-b border-white/10">
              <div className="px-4 md:px-6 py-4 text-white/40">Критерий</div>
              <div className="px-2 md:px-4 py-4 text-center bg-amber/10 text-amber">Мы</div>
              <div className="px-2 md:px-4 py-4 text-center text-white/50">Диспетчерская</div>
              <div className="px-2 md:px-4 py-4 text-center text-white/50">Частник из объявления</div>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className={"grid grid-cols-[1.6fr_1fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr_1fr] items-center " + (i > 0 ? "border-t border-white/6" : "")}
              >
                <div className="px-4 md:px-6 py-3.5 text-[13px] md:text-[14px] font-medium text-white/85">{r.label}</div>
                <div className="px-2 md:px-4 py-3.5 flex justify-center bg-amber/6 self-stretch items-center">
                  <CellView v={r.us} strong />
                </div>
                <div className="px-2 md:px-4 py-3.5 flex justify-center text-center">
                  <CellView v={r.dispatcher} />
                </div>
                <div className="px-2 md:px-4 py-3.5 flex justify-center text-center">
                  <CellView v={r.random} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
