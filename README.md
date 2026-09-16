# ЕКБ-Эвакуатор — сайт

Лендинг службы эвакуации в Екатеринбурге. Next.js 16 (App Router, static export), Tailwind v4, framer-motion, lucide-react.

**Демо:** https://goodrojh.github.io/ekb-evakuator/

## Запуск

```bash
npm install
npm run dev
```

Сборка статики: `npm run build` → папка `out/`.

## Где что менять

| Что | Где |
|---|---|
| Телефон, Telegram, MAX, WhatsApp | `lib/site.ts` → `site` |
| Цены, включённые километры, доплаты | `lib/site.ts` → `vehicleTypes`, `pricing` |
| Ситуации на карточках | `lib/site.ts` → `situations` |
| Районы выезда | `lib/site.ts` → `districts` |
| Отзывы | `components/Reviews.tsx` (сейчас — примеры, замените на реальные) |
| Вопросы-ответы | `components/FAQ.tsx` |
| Фото автопарка | `public/fleet/` + подписи в `components/Fleet.tsx` |
| Палитра и шрифты | `app/globals.css`, `app/layout.tsx` |

## Куда приходят заявки

Все кнопки «Вызвать / Перезвоните мне» открывают одну модальную форму (`components/LeadModal.tsx`).

- **Без настройки:** заявка сохраняется в `localStorage` браузера посетителя и в консоль — это только для теста.
- **Рабочий вариант:** укажите endpoint, принимающий JSON POST, в переменной `NEXT_PUBLIC_LEAD_ENDPOINT`
  (например, форма на [Formspree](https://formspree.io) или свой бот). В GitHub: *Settings → Secrets and variables → Actions → Variables*, затем добавьте в workflow `env`.

Пример JSON заявки:

```json
{ "name": "Иван", "phone": "+7 900 123-45-67", "situation": "ДТП", "place": "ул. Белинского, 100", "vehicle": "", "note": "", "source": "hero", "time": "16.09.2026, 16:05" }
```

## Деплой

Пуш в `main` → GitHub Actions собирает статику и выкладывает на GitHub Pages (`.github/workflows/deploy.yml`).
Для своего домена: добавьте файл `public/CNAME` с доменом и уберите `NEXT_PUBLIC_BASE_PATH` из workflow.
