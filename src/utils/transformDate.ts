export const transformDate = (date: string) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
