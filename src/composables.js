export const generateHours = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    item: String(i + 1).padStart(2, "0"),
  }));
};

export const generateMinutes = () => {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    item: String(i).padStart(2, "0"),
  }));
};
