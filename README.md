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

```bash
npm run deploy
```

Скрипт `scripts/deploy.mjs` собирает статику с `NEXT_PUBLIC_BASE_PATH=/ekb-evakuator` и публикует `out/` в ветку `gh-pages`,
откуда её раздаёт GitHub Pages.

Вариант через GitHub Actions лежит в `deploy-workflow.example.yml` — перенесите его в `.github/workflows/deploy.yml`
(нужен токен со scope `workflow`: `gh auth refresh -h github.com -s workflow`).

Для своего домена: добавьте файл `public/CNAME` с доменом и запускайте деплой с `REPO_NAME=` пустым (basePath `/`).
