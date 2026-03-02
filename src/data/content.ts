export type Availability = "available" | "on hold" | "sold";
export type Medium = "painting" | "mixed media";

export type Artwork = {
  id: string;
  slug: string;
  titleRu: string;
  titleEn: string;
  imageUrl: string;
  images: string[];
  year: string;
  medium: Medium;
  material: string;
  size: string;
  availability: Availability;
  room: string;
  description: string;
};

export type ExhibitionStatus = "current" | "upcoming" | "past";

export type Exhibition = {
  slug: string;
  title: string;
  city: string;
  dateRange: string;
  status: ExhibitionStatus;
  heroImage: string;
  summary: string;
  description: string;
  works: string[];
  installationViews: string[];
};

export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
};

export const siteMeta = {
  title: "DreaMagic",
  author: "Katerina Matusevich",
  description: "Interactive contemporary art gallery in a warm agora style.",
  copyright: "© 2026 DreaMagic. All rights reserved.",
  manifesto: "Свет, память и движение формы во вселенной DreaMagic",
} as const;

export const artworks: Artwork[] = [
  {
    id: "01",
    slug: "cosmicflower",
    titleRu: "Космический цветок",
    titleEn: "Cosmic Flower",
    imageUrl:
      "https://static.tildacdn.com/tild3032-3662-4835-b963-323336643234/Cosmic_Flower.PNG",
    images: [
      "https://static.tildacdn.com/tild3365-6230-4836-a563-333962663837/Cosmic_Flower.PNG",
      "https://static.tildacdn.com/tild3139-6164-4261-b563-653034303333/__2026-03-02__184347.png",
      "https://static.tildacdn.com/tild3237-6466-4535-b139-316563373464/__2026-03-02__184050.png",
    ],
    year: "2024",
    medium: "mixed media",
    material: "Светоотражающая ткань, акрил",
    size: "75 x 55 см",
    availability: "available",
    room: "Celestial Bloom Room",
    description:
      "Медитативная работа с осевой композицией, где цветок читается как космическая мандала и точка внутреннего света.",
  },
  {
    id: "02",
    slug: "galaxyprincess",
    titleRu: "Принцесса Галактики",
    titleEn: "The Princess of the Galaxy",
    imageUrl:
      "https://static.tildacdn.com/tild3836-6534-4661-b162-346636326566/THE_PRINCESS_OF_GALA.jpeg",
    images: [
      "https://static.tildacdn.com/tild6563-3930-4539-a431-356236303639/IMG_6377.jpg",
      "https://static.tildacdn.com/tild3131-3663-4061-b832-303233396531/__2026-03-02__202354.png",
      "https://static.tildacdn.com/tild6636-3163-4563-a238-303734326135/__2026-03-02__202435.png",
      "https://static.tildacdn.com/tild3735-6630-4931-b563-303264323739/__2026-03-02__202411.png",
    ],
    year: "2022",
    medium: "painting",
    material: "Холст, масло",
    size: "35 x 25 см",
    availability: "on hold",
    room: "Silent Aurora Room",
    description:
      "Фигуративный силуэт в северном сиянии, где образ женской энергии растворяется в ауроральных потоках.",
  },
  {
    id: "03",
    slug: "reborn",
    titleRu: "Перерождение",
    titleEn: "Reborn",
    imageUrl:
      "https://static.tildacdn.com/tild6138-6431-4764-b839-393161363838/REBORN.png",
    images: [
      "https://static.tildacdn.com/tild6138-6431-4764-b839-393161363838/REBORN.png",
    ],
    year: "2024",
    medium: "painting",
    material: "Холст, акрил",
    size: "70 x 50 см",
    availability: "available",
    room: "Transformation Room",
    description:
      "Слоистая форма, выстроенная вокруг центрального ядра, говорит о циклах обновления и внутреннем ритме.",
  },
  {
    id: "04",
    slug: "journey",
    titleRu: "Путешествие",
    titleEn: "Journey",
    imageUrl:
      "https://static.tildacdn.com/tild3635-6539-4332-b664-333337653964/IMG_6356.jpg",
    images: [
      "https://static.tildacdn.com/tild3635-6539-4332-b664-333337653964/IMG_6356.jpg",
    ],
    year: "2024",
    medium: "painting",
    material: "Холст, акрил",
    size: "60 x 45 см",
    availability: "available",
    room: "Tidal Orbit Room",
    description:
      "Мягкие вихри и траектории создают ощущение пространственного движения и глубины.",
  },
  {
    id: "05",
    slug: "unknown",
    titleRu: "Неизвестное",
    titleEn: "The Unknown",
    imageUrl:
      "https://static.tildacdn.com/tild6362-3766-4566-b938-613038643362/IMG_6373.jpg",
    images: [
      "https://static.tildacdn.com/tild6362-3766-4566-b938-613038643362/IMG_6373.jpg",
    ],
    year: "2024",
    medium: "painting",
    material: "Холст, масло",
    size: "60 x 45 см",
    availability: "available",
    room: "Tidal Orbit Room",
    description:
      "Закрученная композиция с уходом в центр работает как метафора вхождения в непознанное.",
  },
  {
    id: "06",
    slug: "supernova",
    titleRu: "\"Название\"",
    titleEn: "Supernova (unnamed)",
    imageUrl:
      "https://static.tildacdn.com/tild3764-3062-4335-a135-303665613538/SUPERNOVA.jpeg",
    images: [
      "https://static.tildacdn.com/tild3764-3062-4335-a135-303665613538/SUPERNOVA.jpeg",
    ],
    year: "2024",
    medium: "painting",
    material: "Холст, масло",
    size: "70 x 50 см",
    availability: "available",
    room: "Nova Room",
    description:
      "Контраст холодных и огненных масс напоминает вспышку сверхновой и смену энергетических фаз.",
  },
  {
    id: "07",
    slug: "symphony-of-the-universe",
    titleRu: "Симфония Вселенной",
    titleEn: "Symphony of the Universe",
    imageUrl:
      "https://static.tildacdn.com/tild3436-6365-4333-b135-326338323362/IMG_6355.jpg",
    images: [
      "https://static.tildacdn.com/tild3436-6365-4333-b135-326338323362/IMG_6355.jpg",
    ],
    year: "2024",
    medium: "painting",
    material: "Холст, масло",
    size: "70 x 50 см",
    availability: "on hold",
    room: "Nova Room",
    description:
      "Лирическая работа с потоками цвета, в которой ритмы читаются как партитура космического звука.",
  },
  {
    id: "08",
    slug: "serenity",
    titleRu: "Безмятежность",
    titleEn: "Serenity",
    imageUrl:
      "https://static.tildacdn.com/tild3430-3665-4065-b832-613062623464/IMG_6371.jpg",
    images: [
      "https://static.tildacdn.com/tild3430-3665-4065-b832-613062623464/IMG_6371.jpg",
    ],
    year: "2023",
    medium: "painting",
    material: "Холст, масло",
    size: "60 x 45 см",
    availability: "sold",
    room: "Inner Calm Room",
    description:
      "Спокойная спираль в зелёно-синих тонах создаёт состояние созерцательной тишины.",
  },
  {
    id: "09",
    slug: "the-call",
    titleRu: "Зов",
    titleEn: "The Call",
    imageUrl:
      "https://static.tildacdn.com/tild3133-3835-4565-b162-633531373839/THE_CALL.jpeg",
    images: [
      "https://static.tildacdn.com/tild3133-3835-4565-b162-633531373839/THE_CALL.jpeg",
    ],
    year: "2023",
    medium: "painting",
    material: "Холст, масло",
    size: "60 x 45 см",
    availability: "available",
    room: "Inner Calm Room",
    description:
      "Центральное золотое свечение и плавные потоки цвета передают эффект внутреннего импульса.",
  },
  {
    id: "10",
    slug: "birth-of-the-universe",
    titleRu: "Рождение Вселенной",
    titleEn: "Birth of the Universe",
    imageUrl:
      "https://static.tildacdn.com/tild6530-6565-4965-b662-353161373264/IMG_6358.jpg",
    images: [
      "https://static.tildacdn.com/tild6530-6565-4965-b662-353161373264/IMG_6358.jpg",
    ],
    year: "2023",
    medium: "painting",
    material: "Холст, масло (триптих)",
    size: "120 x 50 см",
    availability: "available",
    room: "Genesis Room",
    description:
      "Триптих с двумя вихревыми центрами исследует тему одновременного рождения множества форм.",
  },
  {
    id: "11",
    slug: "twin-flames",
    titleRu: "Пламя",
    titleEn: "Twin Flames",
    imageUrl:
      "https://static.tildacdn.com/tild3337-3530-4130-b362-386130356539/TWIN_FLAMES.jpeg",
    images: [
      "https://static.tildacdn.com/tild3337-3530-4130-b362-386130356539/TWIN_FLAMES.jpeg",
    ],
    year: "2023",
    medium: "painting",
    material: "Холст, масло",
    size: "70 x 50 см",
    availability: "on hold",
    room: "Genesis Room",
    description:
      "Экспрессивная вертикальная ось и контраст красно-синих мазков образуют дуальный энергетический мотив.",
  },
  {
    id: "12",
    slug: "untitled-orbit",
    titleRu: "\"Название\"",
    titleEn: "Unnamed",
    imageUrl:
      "https://static.tildacdn.com/tild3066-6431-4764-b934-633966643630/IMG_6376.jpg",
    images: [
      "https://static.tildacdn.com/tild3066-6431-4764-b934-633966643630/IMG_6376.jpg",
    ],
    year: "2023",
    medium: "painting",
    material: "Круглый холст, масло",
    size: "50 x 50 см",
    availability: "available",
    room: "Orbit Room",
    description:
      "Круглый формат усиливает ощущение замкнутой орбиты и мягкого перетекания тонов.",
  },
  {
    id: "13",
    slug: "lotus",
    titleRu: "Лотос",
    titleEn: "Lotus",
    imageUrl:
      "https://static.tildacdn.com/tild3066-3365-4738-b131-313164343266/IMG_6359.jpg",
    images: [
      "https://static.tildacdn.com/tild3066-3365-4738-b131-313164343266/IMG_6359.jpg",
    ],
    year: "2023",
    medium: "painting",
    material: "Холст, масло",
    size: "60 x 60 см",
    availability: "available",
    room: "Orbit Room",
    description:
      "Симметричная композиция лотоса соединяет символику роста и внутренней концентрации.",
  },
  {
    id: "14",
    slug: "memory",
    titleRu: "Мемория",
    titleEn: "Memory",
    imageUrl:
      "https://static.tildacdn.com/tild3333-3830-4862-b939-356330346231/__2026-03-02__203536.png",
    images: [
      "https://static.tildacdn.com/tild3333-3830-4862-b939-356330346231/__2026-03-02__203536.png",
    ],
    year: "2026",
    medium: "mixed media",
    material: "Холст, акрил",
    size: "80 x 80 см",
    availability: "available",
    room: "Memory Room",
    description:
      "Кольцевая геометрия памяти выстроена вокруг центра, где точки и круги формируют архив жестов.",
  },
];

export const exhibitions: Exhibition[] = [
  {
    slug: "light-as-memory",
    title: "Light as Memory",
    city: "Bodrum",
    dateRange: "May 2026 - Jul 2026",
    status: "current",
    heroImage: artworks[13].imageUrl,
    summary:
      "Исследование памяти как светового слоя: от мягких орбит к точкам концентрации.",
    description:
      "Выставка объединяет работы, в которых кольцевые формы и потоковые линии читаются как след времени. Экспозиция построена как последовательность тихих комнат с минимальным количеством текстов и максимальной концентрацией на материале.",
    works: ["memory", "cosmicflower", "reborn", "lotus"],
    installationViews: [
      artworks[13].imageUrl,
      artworks[0].imageUrl,
      artworks[12].imageUrl,
    ],
  },
  {
    slug: "rituals-of-color",
    title: "Rituals of Color",
    city: "Istanbul",
    dateRange: "Sep 2026 - Oct 2026",
    status: "upcoming",
    heroImage: artworks[10].imageUrl,
    summary:
      "Серия о ритуале формы и цветовой энергии, построенная на контрасте спокойствия и импульса.",
    description:
      "Будущая выставка рассматривает цвет как ритуальный инструмент. Зритель проходит от медитативных композиций к экспрессивным пиковым точкам, где мазок становится самостоятельным событием.",
    works: ["twin-flames", "the-call", "symphony-of-the-universe"],
    installationViews: [artworks[10].imageUrl, artworks[8].imageUrl],
  },
  {
    slug: "princess-and-aurora",
    title: "Princess and Aurora",
    city: "Moscow",
    dateRange: "Oct 2022 - Nov 2022",
    status: "past",
    heroImage: artworks[1].imageUrl,
    summary:
      "Камерная экспозиция фигуративной и космической линии в раннем периоде проекта.",
    description:
      "Архивная выставка, в которой фигуративный образ впервые был помещен в поле космического света. Проект задал направление последующим сериям DreaMagic.",
    works: ["galaxyprincess"],
    installationViews: [artworks[1].imageUrl],
  },
];

export const journalPosts: JournalPost[] = [
  {
    slug: "agora-as-experience",
    title: "Agora as Experience",
    category: "Essay",
    date: "2026-03-03",
    excerpt:
      "Почему цифровая галерея должна ощущаться как пространство, а не как лента карточек.",
    readTime: "4 min",
  },
  {
    slug: "sun-path-interface",
    title: "Sun Path Interface",
    category: "Process",
    date: "2026-02-20",
    excerpt:
      "Как движение света в течение дня переведено в мягкое изменение тональности интерфейса.",
    readTime: "3 min",
  },
  {
    slug: "materials-and-authenticity",
    title: "Materials and Authenticity",
    category: "Notes",
    date: "2026-02-10",
    excerpt:
      "Зачем в digital-интерфейсе нужны тактильные отсылки к камню, ткани и натуральной фактуре.",
    readTime: "5 min",
  },
];

export const navItems = [
  { href: "/works", label: "WORKS" },
  { href: "/exhibitions", label: "EXHIBITIONS" },
  { href: "/artist", label: "ARTIST" },
  { href: "/visit", label: "VISIT" },
  { href: "/journal", label: "JOURNAL" },
] as const;

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function getExhibitionBySlug(slug: string): Exhibition | undefined {
  return exhibitions.find((exhibition) => exhibition.slug === slug);
}

export function relatedArtworks(slug: string, count = 3): Artwork[] {
  const current = getArtworkBySlug(slug);
  if (!current) {
    return artworks.slice(0, count);
  }

  return artworks
    .filter((item) => item.slug !== slug)
    .filter((item) => item.room === current.room)
    .slice(0, count);
}
