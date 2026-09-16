"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { situations, asset } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Situations() {
  const { open } = useLead();
  return (
    <section id="situations" className="w-full px-5 md:px-8 py-20 md:py-[120px] bg-paper text-ink relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber/10 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] max-w-3xl"
        >
          Что случилось?
          <br />
          <span className="text-muted">Нажмите — и мы уже едем.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-muted max-w-2xl"
        >
          Одна форма, одна цена, один звонок. Выберите ситуацию — форма откроется уже заполненной.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto relative z-10"
      >
        {situations.map((s) => (
          <motion.button
            key={s.id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => open({ situation: s.id, source: "situations", title: `${s.title} — вызвать эвакуатор` })}
            className="group text-left relative rounded-[28px] overflow-hidden border border-ink/10 bg-graphite min-h-[300px] md:min-h-[340px] flex flex-col justify-end p-6 shadow-[0_10px_40px_rgba(15,17,21,0.08)]"
          >
            <img
              src={asset(s.image)}
              alt={s.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/5" />
            <span className="absolute top-5 left-5 rounded-full bg-amber text-ink text-[11px] font-bold tracking-wide uppercase px-3 py-1.5">
              {s.tag}
            </span>
            <span className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all group-hover:bg-amber group-hover:text-ink group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </span>
            <div className="relative z-10">
              <h3 className="font-display text-white text-xl md:text-2xl font-bold leading-tight">{s.title}</h3>
              <p className="text-white/70 text-[14px] leading-relaxed mt-2">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-amber text-[13px] font-bold uppercase tracking-wide">
                Вызвать <span className="w-6 h-px bg-amber transition-all group-hover:w-10" />
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
