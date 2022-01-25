export const round = (value: number, factor: number): number => {
  return Math.round(value / factor) * factor;
};
