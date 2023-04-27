export const odontograma_section_1 = [18, 17, 16, 15, 14, 13, 12, 11] as const;
export const odontograma_section_2 = [21, 22, 23, 24, 25, 26, 27, 28] as const;
export const odontograma_section_3 = [31, 32, 33, 34, 35, 36, 37, 38] as const;
export const odontograma_section_4 = [48, 47, 46, 45, 44, 43, 42, 41] as const;
export const toothMap = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export const toothMapColorScale = [
  'OD-b',
  'OD-o',
  'MM-I',
  'MM-y-o',
  'MM-s',
  'IE',
  'OE-1',
  'OE-2',
  'OE-3',
  'OE-4',
  'OE-5',
  'OE-v',
  'CT-y',
  'CT-o-p',
  'CT-k',
  'CT-o',
  'SI-y',
  'SI-g',
  'II-w-b',
  'T-b-g',
  'T-b',
  'T-o-g',
  'DEFAULT',
] as const;
export const colorScale = [
  'BL1',
  'BL2',
  'BL3',
  'BL4',
  'A1',
  'A2',
  'A3',
  'A3,5',
  'A4',
  'B1',
  'B2',
  'B3',
  'B4',
  'C1',
  'C2',
  'C3',
  'C4',
  'D2',
  'D3',
  'D4',
  'DEFAULT',
] as const;

export type ColorScale = typeof colorScale;
export type ToothMapColorScale = typeof toothMapColorScale;
