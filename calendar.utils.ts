import {
  CalendarModeSelectionType,
  DaySelectionState,
  DayStatus,
} from "./DoubleCalendar.type.ts";

/**
 * Compute for 2 dates in JS if they are in the same month of the same year.
 * See https://github.com/wix/react-native-calendars/blob/b7ec3d16a370ec47e6826d6caa5c44d943aa7a08/src/dateutils.ts#L10
 */
export const sameMonth = (a: Date, b: Date) => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
};

export const sameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

/**
 * For a given date, compute the weeks of the month it belongs to.
 * Each week is an array of 7 Date objects, corresponding to the month.
 * At max a month can have 6 weeks, so we always return 6 weeks to display it properly.
 */
export const getWeeksOfMonth = (date: Date): Date[][] => {
  const weeks: Date[][] = [];
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get the first day of the month and the first Monday of the calendar view
  const currentDate = new Date(year, month, 1);
  const dayOffset = (currentDate.getDay() + 6) % 7; // Adjust so Monday is 0
  currentDate.setDate(currentDate.getDate() - dayOffset);

  // Generate 6 weeks (42 days)
  for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
    const week: Date[] = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
};

export const getNextMonth = (currentMonth: Date) => {
  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1
  );

  return nextMonth;
};

const getFlexibleDayStatus = ({
  day,
  selectedStartDate,
  selectedEndDate,
}: {
  day: Date;
  selectedStartDate: Date;
  selectedEndDate: Date;
}): "selected" | "inBetween" | "default" => {
  if (sameDay(day, selectedStartDate) || sameDay(day, selectedEndDate)) {
    return "selected";
  }

  if (
    day.getTime() >= selectedStartDate.getTime() &&
    day.getTime() <= selectedEndDate.getTime()
  ) {
    return "inBetween";
  }

  return "default";
};

const getSingleDayStatus = ({
  day,
  selectedDay,
}: {
  day: Date;
  selectedDay: Date;
}): "selected" | "default" => {
  if (sameDay(day, selectedDay)) {
    return "selected";
  }

  return "default";
};

const getWeekDayStatus = ({
  day,
  selectedStartDate,
  selectedEndDate,
}: {
  day: Date;
  selectedStartDate: Date;
  selectedEndDate: Date;
}): "inWeek" | "weekStart" | "weekEnd" | "default" => {
  if (sameDay(day, selectedStartDate)) {
    return "weekStart";
  }

  if (sameDay(day, selectedEndDate)) {
    return "weekEnd";
  }

  if (
    day.getTime() >= selectedStartDate.getTime() &&
    day.getTime() <= selectedEndDate.getTime()
  ) {
    return "inWeek";
  }

  return "default";
};

export const getDaySelectedStatus = ({
  day,
  selectedStartDate,
  selectedEndDate,
  modeSelectionType,
}: {
  day: Date;
  selectedStartDate: Date;
  selectedEndDate: Date;
  modeSelectionType: CalendarModeSelectionType;
}): DaySelectionState => {
  if (modeSelectionType === "week") {
    return getWeekDayStatus({ day, selectedStartDate, selectedEndDate });
  }

  if (modeSelectionType === "day") {
    return getSingleDayStatus({ day, selectedDay: selectedStartDate });
  }

  return getFlexibleDayStatus({
    day,
    selectedStartDate,
    selectedEndDate,
  });
};

export const getWeekOfDay = (
  date: Date
): { startOfWeek: Date; endOfWeek: Date } => {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Calculate Monday (start of the week)
  const startOffset = (day === 0 ? -6 : 1) - day; // Adjust if Sunday
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() + startOffset);

  // Calculate Sunday (end of the week)
  const endOffset = 7 - day + (day === 0 ? -7 : 0); // Adjust for Sunday
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + endOffset);

  return { startOfWeek, endOfWeek };
};

export const isWeekIntersectingMonth = (day: Date, month: Date) => {
  // Get the Monday of the week containing `day`
  const dayOfWeek = day.getDay();
  const monday = new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate() - ((dayOfWeek + 6) % 7)
  );

  // Get the Sunday of the same week
  const sunday = new Date(
    monday.getFullYear(),
    monday.getMonth(),
    monday.getDate() + 6
  );

  // Check if the Monday or the Sunday of the week is in the month
  return sameMonth(monday, month) || sameMonth(sunday, month);
};

/**
 * Compare some date with the current date and return the status of the day.
 */
export const getDayStatus = ({
  day,
  monthDate,
  selectedStartDate,
  selectedEndDate,
  modeSelectionType,
  shouldDisplayNotInMonthDay,
  minDate,
  maxDate,
}: {
  day: Date;
  monthDate: Date;
  selectedStartDate: Date;
  selectedEndDate: Date;
  modeSelectionType: CalendarModeSelectionType;
  shouldDisplayNotInMonthDay: boolean;
  minDate?: Date;
  maxDate?: Date;
}): {
  dayStatus: DayStatus;
  containerStatus: DaySelectionState;
  isSelectable: boolean;
} => {
  const isBellowMinDate = minDate ? day.getTime() < minDate?.getTime() : false;
  const isAboveMaxDate = maxDate ? day.getTime() > maxDate?.getTime() : false;

  const isSelectable = !isBellowMinDate && !isAboveMaxDate;
  const daySelectedStatus = getDaySelectedStatus({
    day,
    selectedEndDate,
    selectedStartDate,
    modeSelectionType,
  });

  if (!sameMonth(day, monthDate)) {
    const shouldDisplayWeek =
      isWeekIntersectingMonth(day, monthDate) && shouldDisplayNotInMonthDay;

    if (!shouldDisplayWeek) {
      return {
        dayStatus: "hidden",
        containerStatus: "default",
        isSelectable: false,
      };
    }

    return {
      dayStatus: "notInMonth",
      containerStatus: daySelectedStatus,
      isSelectable,
    };
  }

  if (sameDay(day, new Date()) && daySelectedStatus === "default") {
    return {
      dayStatus: "today",
      containerStatus: daySelectedStatus,
      isSelectable,
    };
  }

  if (!isSelectable && daySelectedStatus === "default") {
    return {
      dayStatus: "notSelectable",
      containerStatus: "default",
      isSelectable,
    };
  }

  return {
    dayStatus: daySelectedStatus,
    containerStatus: daySelectedStatus,
    isSelectable,
  };
};
