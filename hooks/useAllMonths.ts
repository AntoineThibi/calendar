import { useCalendarTranslation } from "./useCalendarTranslation";

// Retourne juste un tableau de mois avec leur nom et leur numéro
export const useAllMonths = () => {
  const { monthNames } = useCalendarTranslation();

  return monthNames.map((month, index) => ({
    monthName: month,
    // Using Dates the month number is 0-indexed
    monthNumber: index,
  }));
};
