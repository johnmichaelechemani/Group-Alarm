const generateHours = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    item: String(i + 1).padStart(2, "0"),
  }));
};

const generateMinutes = () => {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    item: String(i).padStart(2, "0"),
  }));
};

export const generateId = (alarms) => {
  return Math.max(...alarms.map((alarm) => alarm.id), 0) + 1;
};

export const hours = generateHours();
export const minutes = generateMinutes();
export const time = {
  id: 1,
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
};

export const types = [
  { id: 1, item: "AM" },
  { id: 2, item: "PM" },
];
