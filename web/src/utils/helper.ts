export const generateNanoId = (): string => {
  const randomNumber = Math.round(Math.random() * 1e5);
  return randomNumber.toString(16);
};
export const slugify = (value: string): string => {
  return value.trim().toLowerCase().replace(" ", "_");
};
