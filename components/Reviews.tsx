"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

// TODO владельцу: замените на реальные отзывы с Яндекс Карт / 2ГИС / Авито.
// Ниже — примеры формата (имя, район, ситуация, текст).
const reviews = [
  {
    name: "Дмитрий",
    area: "Ботаника",
    case: "ДТП, ночь",
    text: "Столкнулись в час ночи на Белинского. Позвонил — приехали за 15 минут, цену назвали сразу и ровно столько взяли. Машину закатили аккуратно, даже бампер висящий подвязали.",
  },
  {
    name: "Ольга",
    area: "Академический",
    case: "Не завелась зимой",
    text: "В −28 машина не завелась во дворе. Другие просили доплату «за мороз», здесь — нет. Довезли до сервиса, скинули фото погрузки. Спокойно и по-человечески.",
  },
  {
    name: "Артём",
    area: "Верхняя Пышма → Челябинск",
    case: "Межгород",
    text: "Перегонял купленную машину без документов на ход. Договорились по километражу, приехал точно в назначенное время, по дороге на связи. Рекомендую.",
  },
];

export default function Reviews() {
  return (
    <section className="w-full px-5 md:px-8 py-20 md:py-[120px] bg-paper text-ink">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-amber-deep mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-deep" /> Отзывы
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
              Что говорят те,
              <br />
              <span className="text-muted">кого мы уже довезли.</span>
            </h2>
          </div>
          <a
            href="https://yandex.ru/maps/?text=ЕКБ-Эвакуатор"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-bold hover:bg-graphite-2 transition-colors w-fit"
          >
            <span className="flex items-center gap-1 text-amber">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber" />
              ))}
            </span>
            Все отзывы на Яндекс Картах <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-[24px] bg-white border border-ink/8 p-6 md:p-7 flex flex-col gap-5 shadow-[0_10px_40px_rgba(15,17,21,0.06)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-0.5 text-amber">
                  {[1, 2, 3, 4, 5].map((k) => (
                    <Star key={k} className="h-4 w-4 fill-amber" />
                  ))}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-amber-deep bg-amber/15 rounded-full px-2.5 py-1">
                  {r.case}
                </span>
              </div>
              <blockquote className="text-[15px] leading-relaxed text-ink/85 flex-1">«{r.text}»</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-ink text-amber font-display font-bold flex items-center justify-center">
                  {r.name[0]}
                </span>
                <div>
                  <div className="font-bold text-[14px]">{r.name}</div>
                  <div className="text-[12px] text-muted">{r.area}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
