"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Ruler, Weight, Anchor, Camera, Phone } from "lucide-react";
import { site, asset } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

// Одна машина. Все фото ниже — она же на разных выездах.
const truck = {
  name: "ГАЗель со сдвижной платформой",
  photo: "/fleet/fleet-02.jpg",
  specs: [
    { icon: Weight, big: "до 3,5 т", small: "грузоподъёмность платформы" },
    { icon: Ruler, big: "5,5 м", small: "длина платформы — влезет даже пикап" },
    { icon: Anchor, big: "лебёдка 4 т", small: "вытащит из кювета и снега" },
    { icon: Camera, big: "фото-отчёт", small: "до и после погрузки" },
  ],
};

const rides = [
  { src: "/fleet/fleet-04.jpg", caption: "Кроссовер у дилерского центра" },
  { src: "/fleet/fleet-03.jpg", caption: "Новая LADA — доставка в салон" },
  { src: "/fleet/fleet-01.jpg", caption: "Седан, крепление 4 ремнями" },
  { src: "/fleet/fleet-06.jpg", caption: "Ночной выезд по городу" },
  { src: "/fleet/fleet-05.jpg", caption: "Минивэн на платформе" },
  { src: "/fleet/fleet-07.jpg", caption: "Range Rover — полный привод" },
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

  const all = [...rides, ...rides];

  return (
    <section id="fleet" className="bg-night py-20 md:py-[120px] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Фото машины */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative rounded-[28px] overflow-hidden border border-white/10 aspect-[4/3]"
          >
            <img src={asset(truck.photo)} alt={truck.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-night/70 backdrop-blur-md border border-white/15 pl-2 pr-3.5 py-1.5 text-[12px] font-bold">
              <span className="w-2 h-2 rounded-full bg-amber beacon" /> Реальное фото, не сток
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <div className="font-display font-bold text-lg md:text-xl">{truck.name}</div>
              <div className="text-[13px] text-white/60 mt-0.5">Водитель — владелец. {site.yearsExperience} лет за рулём эвакуатора</div>
            </div>
          </motion.div>

          {/* Текст + характеристики */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
              Приедет именно
              <br />
              <span className="text-white/60">эта машина.</span>
            </h2>
            <p className="mt-4 text-white/65 text-lg">
              Не диспетчерская, которая перепродаёт заказ первому попавшемуся. Одна машина, один водитель — тот, с кем вы говорите по телефону, и приедет.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {truck.specs.map((s) => (
                <motion.div
                  key={s.big}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-graphite border border-white/10 p-4"
                >
                  <s.icon className="h-5 w-5 text-amber" />
                  <div className="font-display font-bold text-[15px] sm:text-lg md:text-xl mt-2.5 leading-tight">{s.big}</div>
                  <div className="text-[12px] text-white/55 mt-1 leading-snug">{s.small}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={site.phoneHref}
                className="rounded-full px-6 py-3.5 text-sm font-bold text-ink bg-amber hover:bg-amber-deep transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" /> Позвонить
              </a>
              <button
                onClick={() => open({ source: "fleet", title: "Вызвать эвакуатор" })}
                className="rounded-full px-6 py-3.5 text-sm font-bold border border-white/15 hover:bg-white/5 transition-colors"
              >
                Перезвоните мне
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl md:text-2xl font-bold">Она же — на выездах</h3>
          <span className="text-[13px] text-white/45 hidden sm:block">листайте или наведите, чтобы остановить</span>
        </div>
      </div>

      <div className="relative mt-6">
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
              className="min-w-[260px] md:min-w-[340px] aspect-[4/3] rounded-[22px] overflow-hidden relative border border-white/10 bg-graphite"
            >
              <img src={asset(p.src)} alt={p.caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 p-4 text-[14px] font-semibold">{p.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
