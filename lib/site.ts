// Единая точка правды по контактам, ценам и текстам.
// Меняйте здесь — обновится по всему сайту.

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE_PATH}${p}`;

export const site = {
  name: "ЕКБ-Эвакуатор",
  city: "Екатеринбург",
  phoneDisplay: "+7 982 655-85-43",
  phoneHref: "tel:+79826558543",
  telegram: "https://t.me/brusavto96",
  max: "https://max.ru/u/f9LHodD0cOIDi-6yO6z1eUmL4819T7Slpzejy69YkpRNzEdlZbFL_kKkVyc",
  // WhatsApp — если есть, укажите номер без "+": "79826558543"
  whatsapp: "",
  yearsExperience: 15,
  arrivalMinutes: "10–20",
  // Опционально: endpoint для заявок (например, Formspree: https://formspree.io/f/xxxx)
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "",
  url: "https://goodrojh.github.io/ekb-evakuator/",
};

export type VehicleType = {
  id: string;
  label: string;
  short: string;
  from: number; // базовая цена по городу, ₽
  note: string;
};

export const vehicleTypes: VehicleType[] = [
  { id: "car", label: "Легковой автомобиль", short: "Легковой", from: 2500, note: "седан, хэтчбек, универсал" },
  { id: "suv", label: "Кроссовер / внедорожник", short: "Внедорожник", from: 3000, note: "до 3,5 т, полный привод" },
  { id: "van", label: "Микроавтобус / коммерческий", short: "Коммерческий", from: 3500, note: "Газель, фургон, минивэн" },
  { id: "special", label: "Малая спецтехника", short: "Спецтехника", from: 4000, note: "погрузчик, мини-трактор, каток" },
];

export const pricing = {
  cityIncludedKm: 10, // км по городу, включённые в базовую цену
  cityKmRate: 60, // ₽ за км сверх включённых по городу
  intercityKmRate: 50, // ₽ за км по области и межгороду
  blockedWheel: 500, // ₽ за каждое заблокированное колесо
  winch: 1000, // ₽ работа лебёдкой (кювет, снег, грязь)
  waitingHour: 1000, // ₽ за час простоя (первые 30 минут бесплатно)
  nightSurcharge: 0, // ночью без наценки — наше преимущество
};

export type Situation = {
  id: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
};

export const situations: Situation[] = [
  {
    id: "dtp",
    title: "ДТП",
    desc: "Приедем на место, аккуратно погрузим повреждённую машину, довезём до сервиса или стоянки.",
    image: "/img/sit-dtp.jpg",
    tag: "срочно",
  },
  {
    id: "broken",
    title: "Не заводится / сломалась",
    desc: "Заглохли на дороге или во дворе — заберём и доставим в удобный вам автосервис.",
    image: "/img/step-call.jpg",
    tag: "10–20 мин",
  },
  {
    id: "stuck",
    title: "Застряли: кювет, снег, грязь",
    desc: "Вытащим лебёдкой и, если нужно, отвезём. Работаем зимой и в дождь.",
    image: "/img/sit-stuck.jpg",
    tag: "лебёдка",
  },
  {
    id: "dealer",
    title: "Перевозка в сервис или салон",
    desc: "Новый авто из салона, машина на ТО или на продажу — без пробега и без царапин.",
    image: "/img/sit-dealer.jpg",
    tag: "бережно",
  },
  {
    id: "commercial",
    title: "Коммерческий транспорт и спецтехника",
    desc: "Газели, фургоны, мини-погрузчики и другая техника до 3,5 т на сдвижной платформе.",
    image: "/fleet/fleet-07.jpg",
    tag: "до 3,5 т",
  },
  {
    id: "intercity",
    title: "Межгород и область",
    desc: "Свердловская область, Челябинск, Тюмень, Пермь. Честная цена за километр.",
    image: "/img/step-arrive.jpg",
    tag: "50 ₽/км",
  },
];

export const situationOptions = [
  { id: "dtp", label: "ДТП" },
  { id: "broken", label: "Не заводится / сломалась" },
  { id: "stuck", label: "Застрял (кювет, снег, грязь)" },
  { id: "dealer", label: "Перевезти в сервис / салон" },
  { id: "commercial", label: "Коммерческий транспорт / спецтехника" },
  { id: "intercity", label: "Межгород / область" },
  { id: "other", label: "Другое" },
];

export const districts = [
  "Центр",
  "Уралмаш",
  "Эльмаш",
  "ВИЗ",
  "Ботаника",
  "Академический",
  "Пионерский",
  "ЖБИ",
  "Химмаш",
  "Сортировка",
  "Компрессорный",
  "Юго-Западный",
  "Втузгородок",
  "Парковый",
  "Заречный",
  "Широкая Речка",
  "Кольцово",
  "Верхняя Пышма",
  "Берёзовский",
  "Арамиль",
  "Среднеуральск",
  "ЕКАД и трассы",
];
