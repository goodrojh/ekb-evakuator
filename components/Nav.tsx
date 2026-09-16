"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { useLead } from "@/components/LeadModal";
import Logo from "@/components/Logo";

const links = [
  { label: "Ситуации", href: "#situations" },
  { label: "Цены", href: "#prices" },
  { label: "Как работаем", href: "#how" },
  { label: "Машина", href: "#fleet" },
  { label: "Вопросы", href: "#faq" },
];

export default function Nav() {
  const { open } = useLead();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="fixed top-0 inset-x-0 z-50 px-3 md:px-8 pt-3 md:pt-5"
      >
        <div
          className={
            "max-w-6xl mx-auto flex items-center justify-between p-[8px] pl-4 rounded-full border transition-all duration-300 " +
            (scrolled
              ? "bg-night/80 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
              : "bg-white/5 backdrop-blur-xl border-white/10")
          }
        >
          <a href="#top" className="flex items-center gap-2.5 shrink-0" aria-label={site.name}>
            <Logo compact />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden md:flex items-center gap-2 text-[15px] font-bold text-white px-3 py-2 hover:text-amber transition-colors"
            >
              <Phone className="h-4 w-4 text-amber" />
              {site.phoneDisplay}
            </a>
            <button
              onClick={() => open({ source: "nav", title: "Вызвать эвакуатор" })}
              className="rounded-full px-4 md:px-5 py-2.5 text-[14px] font-bold bg-amber text-ink hover:bg-amber-deep transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Вызвать
            </button>
            <button
              onClick={() => setMenu(true)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
              aria-label="Меню"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-night/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setMenu(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl font-bold py-3 border-b border-white/10 hover:text-amber transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <a
              href={site.phoneHref}
              className="rounded-full bg-amber text-ink font-bold py-4 flex items-center justify-center gap-2 text-lg"
            >
              <Phone className="h-5 w-5" /> {site.phoneDisplay}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
