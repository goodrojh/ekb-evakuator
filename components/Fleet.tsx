"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Ruler, Weight, Anchor, Camera } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

const photos = [
  { src: "/fleet/fleet-02.jpg", caption: "ГАЗель со сдвижной платформой", sub: "Основная машина. Дежурит в городе" },
  { src: "/fleet/fleet-04.jpg", caption: "Погрузка кроссовера", sub: "У дилерского центра" },
  { src: "/fleet/fleet-03.jpg", caption: "Доставка новой LADA", sub: "Возим для автосалонов" },
  { src: "/fleet/fleet-01.jpg", caption: "Легковой седан", sub: "Крепление 4 ремнями" },
  { src: "/fleet/fleet-06.jpg", caption: "Ночной выезд", sub: "Работаем в любое время суток" },
  { src: "/fleet/fleet-05.jpg", caption: "Минивэн на платформе", sub: "До 3,5 тонн" },
  { src: "/fleet/fleet-07.jpg", caption: "Внедорожник Range Rover", sub: "Полный привод — без проблем" },
];

const specs = [
  { icon: Weight, big: "до 3,5 т", small: "грузоподъёмность платформы" },
  { icon: Ruler, big: "5,5 м", small: "длина платформы — влезет даже пикап" },
  { icon: Anchor, big: "лебёдка 4 т", small: "вытащим из кювета и снега" },
  { icon: Camera, big: "фото-отчёт", small: "до и после погрузки" },
];

export default function Fleet() {
  const { open } = useLead();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const pos = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    const tick = () => {
      if (!hovered) {
        pos.current += 0.6;
        if (pos.current >= el.scrollWidth / 2) pos.current = 0;
        el.scrollLeft = pos.current;
      } else {
        pos.current = el.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const all = [...photos, ...photos];

  return (
    <section id="fleet" className="bg-night py-20 md:py-[120px] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-amber mb-4">
              <span className="w-2 h-2 rounded-full bg-amber" /> Реальные фото, не стоковые
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
              Приедет именно
              <br />
              <span className="text-white/60">эта машина.</span>
            </h2>
            <p className="mt-4 text-white/65 text-lg max-w-xl">
              Не диспетчерская, которая перепродаёт заказ первому попавшемуся. Свой эвакуатор, свой водитель, {" "}
              15 лет за рулём.
            </p>
          </div>
          <button
            onClick={() => open({ source: "fleet", title: "Вызвать эвакуатор" })}
            className="rounded-full px-6 py-3 text-sm font-bold text-ink bg-amber hover:bg-amber-deep transition-colors"
          >
            Вызвать эту машину
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-night to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-night to-transparent z-10 pointer-events-none" />
        <div
          ref={scrollRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setHovered(false)}
          className="flex gap-4 overflow-x-auto pb-4 px-5 md:px-8 no-scrollbar cursor-grab active:cursor-grabbing"
        >
          {all.map((p, i) => (
            <motion.figure
              key={p.src + i}
              whileHover={{ y: -4 }}
              className="min-w-[280px] md:min-w-[380px] aspect-[4/3] rounded-[22px] overflow-hidden relative border border-white/10 bg-graphite"
            >
              <img src={asset(p.src)} alt={p.caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 p-5">
                <div className="font-display font-bold text-[15px]">{p.caption}</div>
                <div className="text-[12px] text-white/60 mt-0.5">{p.sub}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {specs.map((s) => (
          <motion.div
            key={s.big}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-graphite border border-white/10 p-4 md:p-5"
          >
            <s.icon className="h-5 w-5 text-amber" />
            <div className="font-display font-bold text-xl md:text-2xl mt-3">{s.big}</div>
            <div className="text-[12px] md:text-[13px] text-white/55 mt-1 leading-snug">{s.small}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
