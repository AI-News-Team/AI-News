export const Categories = [
    "news",
] as const;

export type Category = typeof Categories[number];