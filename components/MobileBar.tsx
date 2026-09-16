"use client";
import React, { useEffect, useState } from "react";
import { Phone, MessageSquare } from "lucide-react";
import { site } from "@/lib/site";
import { useLead } from "@/components/LeadModal";

// Липкая панель для мобильных: звонок и заявка всегда под большим пальцем.
export default function MobileBar() {
  const { open } = useLead();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={
        "md:hidden fixed bottom-0 inset-x-0 z-[80] p-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-300 " +
        (show ? "translate-y-0" : "translate-y-full")
      }
    >
      <div className="flex gap-2 rounded-full bg-night/90 backdrop-blur-xl border border-white/15 p-1.5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <a
          href={site.phoneHref}
          className="flex-1 h-12 rounded-full bg-amber text-ink font-bold flex items-center justify-center gap-2 text-[15px]"
        >
          <Phone className="h-4.5 w-4.5" /> Позвонить
        </a>
        <button
          onClick={() => open({ source: "mobile-bar", title: "Перезвоните мне" })}
          className="flex-1 h-12 rounded-full bg-white/10 text-white font-bold flex items-center justify-center gap-2 text-[15px]"
        >
          <MessageSquare className="h-4.5 w-4.5" /> Заявка
        </button>
      </div>
    </div>
  );
}
