export type Car = {
  slug: string;
  tag: string;
  name: string;
  trans: string;
  seats: number;
  bags: number;
  rating: number;
  price: number;
  img: string;
};

export const cars: Car[] = [
  {
    slug: "toyota-yaris",
    tag: "Hatchback",
    name: "Toyota Yaris",
    trans: "Automatic/Manual",
    seats: 3,
    bags: 1,
    rating: 4.7,
    price: 70,
    img: "/cars/car-yaris.jpg",
  },
  {
    slug: "alphard",
    tag: "Minivan",
    name: "Alphard",
    trans: "Automatic",
    seats: 5,
    bags: 2,
    rating: 4.8,
    price: 95,
    img: "/cars/car-alphard.jpg",
  },
  {
    slug: "lexus-nx-300",
    tag: "SUV",
    name: "Lexus NX - 300",
    trans: "Automatic",
    seats: 5,
    bags: 2,
    rating: 4.7,
    price: 88,
    img: "/cars/car-lexus.jpg",
  },
  {
    slug: "camry",
    tag: "Sedan",
    name: "Camry",
    trans: "Automatic",
    seats: 3,
    bags: 2,
    rating: 4.9,
    price: 50,
    img: "/cars/car-camry.jpg",
  },
  {
    slug: "innova",
    tag: "Minivan",
    name: "Innova",
    trans: "Manual",
    seats: 5,
    bags: 2,
    rating: 4.9,
    price: 85,
    img: "/cars/car-innova.jpg",
  },
  {
    slug: "toyota-fortuner",
    tag: "SUV",
    name: "Toyota Fortuner",
    trans: "Automatic",
    seats: 5,
    bags: 2,
    rating: 4.8,
    price: 75,
    img: "/cars/car-fortuner.jpg",
  },
  {
    slug: "innova-zenix",
    tag: "MPV",
    name: "Innova Zenix",
    trans: "Automatic/Manual",
    seats: 6,
    bags: 2,
    rating: 4.8,
    price: 60,
    img: "/cars/car-zenix.jpg",
  },
  {
    slug: "terios",
    tag: "SUV",
    name: "Terios",
    trans: "Automatic/Manual",
    seats: 5,
    bags: 2,
    rating: 4.6,
    price: 70,
    img: "/cars/car-terios.jpg",
  },
];

export function getCarBySlug(slug: string) {
  return cars.find((c) => c.slug === slug);
}
