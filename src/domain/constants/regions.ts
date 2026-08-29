export const REGIONS = [
  'euw',
  'eune',
  'na',
  'br',
  'lan',
  'las',
  'oce',
  'kr',
  'jp',
  'tr',
  'ru',
] as const;

export type Region = (typeof REGIONS)[number];
