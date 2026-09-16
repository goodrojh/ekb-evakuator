"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { districts } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

const intercity = [
  { city: "Челябинск", km: "≈ 210 км" },
  { city: "Тюмень", km: "≈ 330 км" },
  { city: "Пермь", km: "≈ 360 км" },
  { city: "Нижний Тагил", km: "≈ 140 км" },
  { city: "Каменск-Уральский", km: "≈ 100 км" },
  { city: "Первоуральск", km: "≈ 45 км" },
];

export default function Coverage() {
  const { open } = useLead();
  return (
    <section className="w-full px-5 md:px-8 py-20 md:py-[120px] bg-paper text-ink relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[32px] md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-[1.05]">
            Весь Екатеринбург.
            <br />
            <span className="text-muted">И вся область.</span>
          </h2>
          <p className="mt-4 text-muted text-lg">
            Дежурим в городе, чтобы до любого района доехать за {""}
            <span className="text-ink font-semibold">10–20 минут</span>. За ЕКАД — по километражу, без «выезда за город».
          </p>

          <div className="mt-8 rounded-[24px] bg-ink text-white p-6">
            <div className="text-[11px] font-bold uppercase tracking-wide text-white/50 mb-4">Межгород — 50 ₽/км</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {intercity.map((c) => (
                <div key={c.city} className="flex items-center justify-between text-[14px] border-b border-white/8 pb-2">
                  <span className="font-semibold">{c.city}</span>
                  <span className="text-white/50">{c.km}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => open({ situation: "intercity", source: "coverage", title: "Межгород — рассчитать" })}
              className="mt-5 w-full rounded-full bg-amber text-ink font-bold py-3.5 hover:bg-amber-deep transition-colors"
            >
              Рассчитать межгород
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <div className="rounded-[28px] bg-white border border-ink/8 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,17,21,0.06)]">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="h-5 w-5 text-amber-deep" />
              <span className="font-display font-bold text-lg">Районы Екатеринбурга и пригород</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {districts.map((d, i) => (
                <motion.button
                  key={d}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => open({ source: "district", title: `Эвакуатор — ${d}`, note: `район: ${d}` })}
                  className="rounded-full border border-ink/12 bg-paper px-4 py-2 text-[13px] font-semibold hover:bg-amber hover:border-amber transition-colors"
                >
                  {d}
                </motion.button>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-muted">
              Нажмите на район — форма откроется с ним. Нет вашего района? Всё равно приедем: звоните.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
