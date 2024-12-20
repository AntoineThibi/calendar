export type CalendarModeSelectionType =
  | "flexible"
  | "week"
  | "day"
  | "month"
  | "jobStart";

export type DaySelectionState =
  | "selected"
  | "inBetween"
  | "weekStart"
  | "weekEnd"
  | "inWeek"
  | "default";

export type DayStatus =
  | "selected"
  | "inBetween"
  | "weekStart"
  | "weekEnd"
  | "inWeek"
  | "default"
  | "today"
  | "notInMonth"
  | "hidden"
  | "notSelectable";
