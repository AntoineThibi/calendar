// eslint-disable-next-line no-restricted-imports
import { format } from "date-fns"; // On peut faire mieux ici

const CALENDAR_DATE_FORMAT = "yyyy-MM-dd";
export const formatToCalendarDate = (date: Date) =>
  format(date, CALENDAR_DATE_FORMAT);
