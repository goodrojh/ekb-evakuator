"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Send, Check, MapPin, Car, User, MessageCircle } from "lucide-react";
import { site, situationOptions } from "@/lib/site";

type LeadOptions = {
  situation?: string;
  source?: string;
  title?: string;
  vehicle?: string;
  note?: string;
};

type Ctx = { open: (o?: LeadOptions) => void };
const LeadCtx = createContext<Ctx>({ open: () => {} });
export const useLead = () => useContext(LeadCtx);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<LeadOptions | null>(null);
  const open = useCallback((o: LeadOptions = {}) => setOpts(o), []);
  const value = useMemo(() => ({ open }), [open]);
  return (
    <LeadCtx.Provider value={value}>
      {children}
      <AnimatePresence>{opts && <LeadModal opts={opts} onClose={() => setOpts(null)} />}</AnimatePresence>
    </LeadCtx.Provider>
  );
}

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  if (!d) return "";
  let out = "+7";
  if (d.length > 1) out += " " + d.slice(1, 4);
  if (d.length > 4) out += " " + d.slice(4, 7);
  if (d.length > 7) out += "-" + d.slice(7, 9);
  if (d.length > 9) out += "-" + d.slice(9, 11);
  return out;
}

function LeadModal({ opts, onClose }: { opts: LeadOptions; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [situation, setSituation] = useState(opts.situation || "");
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const digits = phone.replace(/\D/g, "");
  const valid = digits.length === 11;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("sending");
    const payload = {
      name,
      phone,
      situation: situationOptions.find((s) => s.id === situation)?.label || situation || "не указано",
      place,
      vehicle: opts.vehicle || "",
      note: opts.note || "",
      source: opts.source || "site",
      page: typeof window !== "undefined" ? window.location.href : "",
      time: new Date().toLocaleString("ru-RU"),
    };
    try {
      if (site.leadEndpoint) {
        const r = await fetch(site.leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error("bad status");
      } else {
        // Без бэкенда: сохраняем локально, чтобы владелец видел заявки в консоли/localStorage
        console.info("[lead]", payload);
        try {
          const prev = JSON.parse(localStorage.getItem("leads") || "[]");
          localStorage.setItem("leads", JSON.stringify([...prev, payload]));
        } catch {}
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const title = opts.title || "Вызвать эвакуатор";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative w-full sm:max-w-[520px] bg-graphite border border-white/10 rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        <div className="hazard-stripe h-2 w-full" />
        <button
          onClick={onClose}
          className="absolute right-4 top-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8">
          {status === "done" ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-16 h-16 rounded-full bg-live/15 border border-live/40 flex items-center justify-center mb-5">
                <Check className="h-8 w-8 text-live" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Заявка принята</h3>
              <p className="text-white/70 text-[15px] leading-relaxed max-w-[360px]">
                Перезвоним в течение 2 минут и назовём точную цену. Если срочно — звоните прямо сейчас, трубку берём всегда.
              </p>
              <a
                href={site.phoneHref}
                className="mt-6 w-full rounded-full bg-amber text-ink font-bold py-4 flex items-center justify-center gap-2 hover:bg-amber-deep transition-colors"
              >
                <Phone className="h-5 w-5" /> {site.phoneDisplay}
              </a>
              <a
                href={site.telegram}
                target="_blank"
                rel="noreferrer"
                className="mt-3 w-full rounded-full border border-white/15 text-white font-semibold py-3.5 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> Написать в Telegram
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="pr-10">
                <div className="flex items-center gap-2 text-amber text-xs font-bold tracking-[0.14em] uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber beacon" /> Оператор на связи 24/7
                </div>
                <h3 className="font-display text-[22px] sm:text-2xl font-bold leading-tight">{title}</h3>
                <p className="text-white/60 text-sm mt-1.5">
                  Оставьте номер — перезвоним за 2 минуты и зафиксируем цену. Или звоните сразу:{" "}
                  <a href={site.phoneHref} className="text-amber font-semibold whitespace-nowrap">
                    {site.phoneDisplay}
                  </a>
                </p>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-white/60">Телефон *</span>
                <div className="flex items-center gap-3 bg-night border border-white/10 rounded-2xl px-4 focus-within:border-amber/60 transition-colors">
                  <Phone className="h-4 w-4 text-white/40 shrink-0" />
                  <input
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="+7 ___ ___-__-__"
                    className="w-full bg-transparent py-3.5 outline-none text-[16px] placeholder:text-white/30"
                  />
                </div>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-white/60">Что случилось</span>
                  <div className="flex items-center gap-3 bg-night border border-white/10 rounded-2xl px-4 focus-within:border-amber/60 transition-colors">
                    <Car className="h-4 w-4 text-white/40 shrink-0" />
                    <select
                      value={situation}
                      onChange={(e) => setSituation(e.target.value)}
                      className="w-full bg-transparent py-3.5 outline-none text-[15px] appearance-none"
                    >
                      <option value="" className="bg-graphite">
                        Выберите
                      </option>
                      {situationOptions.map((s) => (
                        <option key={s.id} value={s.id} className="bg-graphite">
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-white/60">Имя</span>
                  <div className="flex items-center gap-3 bg-night border border-white/10 rounded-2xl px-4 focus-within:border-amber/60 transition-colors">
                    <User className="h-4 w-4 text-white/40 shrink-0" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться"
                      className="w-full bg-transparent py-3.5 outline-none text-[15px] placeholder:text-white/30"
                    />
                  </div>
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-white/60">Где вы находитесь</span>
                <div className="flex items-center gap-3 bg-night border border-white/10 rounded-2xl px-4 focus-within:border-amber/60 transition-colors">
                  <MapPin className="h-4 w-4 text-white/40 shrink-0" />
                  <input
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="Улица, ориентир или километр трассы"
                    className="w-full bg-transparent py-3.5 outline-none text-[15px] placeholder:text-white/30"
                  />
                </div>
              </label>

              {opts.vehicle && (
                <div className="text-xs text-white/50 -mt-1">
                  Авто: <span className="text-white/80">{opts.vehicle}</span>
                  {opts.note ? ` · ${opts.note}` : ""}
                </div>
              )}

              {status === "error" && (
                <p className="text-signal text-sm">Не удалось отправить. Позвоните нам — это быстрее.</p>
              )}

              <button
                type="submit"
                disabled={!valid || status === "sending"}
                className="mt-1 w-full rounded-full bg-amber text-ink font-bold py-4 text-[16px] flex items-center justify-center gap-2 hover:bg-amber-deep transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_10px_40px_rgba(255,176,32,0.25)]"
              >
                <Send className="h-4 w-4" />
                {status === "sending" ? "Отправляем…" : "Перезвоните мне"}
              </button>
              <p className="text-[11px] text-white/35 text-center leading-relaxed">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Никакого спама — только звонок по вашей заявке.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
