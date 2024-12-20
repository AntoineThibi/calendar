import { Spacer } from "@colas/design-system/src/atoms/Spacer/Spacer.component";
import { Typo } from "@colas/design-system/src/atoms/Typo/Typo.component";
import { ChevronLeftIcon } from "@colas/design-system/src/icons/navigation/ChevronLeftIcon.component";
import { ChevronRightIcon } from "@colas/design-system/src/icons/navigation/ChevronRightIcon.component";
import styled from "@colas/design-system/src/libs/styled-components";
import {
  getDayStatus,
  getNextMonth,
  getWeekOfDay,
  getWeeksOfMonth,
  sameDay,
} from "@colas/design-system/src/molecules/Calendar/calendar.utils";
import {
  CalendarModeSelectionType,
  DaySelectionState,
  DayStatus,
} from "@colas/design-system/src/molecules/Calendar/DoubleCalendar.type";
import { MonthCalendar } from "@colas/design-system/src/molecules/Calendar/view/MonthCalendar.component";
import { Pressable } from "@colas/design-system/src/primitives/Pressable/Pressable.component";
import { ColasTheme } from "@colas/design-system/src/provider/ColasTheme/ColasTheme.context";
import { useColasTheme } from "@colas/design-system/src/provider/ColasTheme/useColasTheme.hook";
import { DateRange } from "@colas/design-system/src/types/dateRange";
import { useDateFormat } from "@colas/utils/src/date/useDateFormat.hook";
import { useCalendarTranslation } from "@colas/utils/src/i18n/i18nCalendarConfig/useCalendarTranslation";
import { useState } from "react";

interface Props {
  selectedRange: DateRange;
  onChangeRange: (range: DateRange) => void;
  focusedMonth: Date;
  onFocusOnMonth: (date: Date) => void;
  /**
   * Display a header with the mode selector
   * Only available on wide screens
   */
  modeSelectionType?: CalendarModeSelectionType;
  /**
   * On tablet and desktop, the calendar can be displayed in single or double mode
   * On mobile, the calendar is always displayed in single mode
   */
  displayMode: "double" | "single";
  minDate?: Date;
  maxDate?: Date;
}

export const DoubleCalendarView = ({
  focusedMonth: currentMonth,
  onFocusOnMonth: onMonthChange,
  selectedRange,
  onChangeRange,
  modeSelectionType = "flexible",
  displayMode,
  minDate,
  maxDate,
}: Props) => {
  const { isMobile } = useColasTheme();

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // On mobile, the double month display is not available
  const hasDoubleMonthDisplay = !isMobile && displayMode === "double";

  // On a single month display, in week selection we want to display the days that are not in the current month to display the whole week
  const shouldDisplayNotInMonthDay =
    modeSelectionType === "week" && !hasDoubleMonthDisplay;

  const handleSelectDate = (date: Date) => {
    if (modeSelectionType === "flexible") {
      if (
        date.getTime() >= selectedRange.startDate.getTime() &&
        sameDay(selectedRange.startDate, selectedRange.endDate)
      ) {
        onChangeRange({ ...selectedRange, endDate: date });
        return;
      }

      onChangeRange({ startDate: date, endDate: date });

      return;
    }

    if (modeSelectionType === "week") {
      const { startOfWeek, endOfWeek } = getWeekOfDay(date);

      onChangeRange({ startDate: startOfWeek, endDate: endOfWeek });
      return;
    }

    if (modeSelectionType === "day") {
      onChangeRange({ startDate: date, endDate: date });
      return;
    }

    if (modeSelectionType === "month") {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      onChangeRange({
        startDate: monthStart,
        endDate: monthEnd,
      });

      return;
    }
  };

  const renderDayInMonth = (day: Date, month: Date, id: number) => {
    const endDateToCompare = !sameDay(
      selectedRange.startDate,
      selectedRange.endDate
    )
      ? selectedRange.endDate
      : hoveredDate;

    const daySelectedStatus = getDayStatus({
      day,
      monthDate: month,
      selectedEndDate: endDateToCompare ?? selectedRange.startDate,
      selectedStartDate: selectedRange.startDate,
      modeSelectionType,
      shouldDisplayNotInMonthDay,
      minDate,
      maxDate,
    });

    return (
      <DayBox
        key={id}
        onHoverIn={() => {
          setHoveredDate(day);
        }}
        onHoverOut={() => setHoveredDate(null)}
        onPress={() => handleSelectDate(day)}
        disabled={!daySelectedStatus.isSelectable}
      >
        <DayContainer selectedState={daySelectedStatus.containerStatus}>
          <DayText selectedState={daySelectedStatus.dayStatus}>
            {day.getDate()}
          </DayText>
        </DayContainer>
      </DayBox>
    );
  };

  const renderWeekInMonth = (week: Date[], month: Date, id: number) => {
    return (
      <Week key={id}>
        {week.map((day, index) => renderDayInMonth(day, month, index))}
      </Week>
    );
  };

  const renderMonth = (month: Date) => {
    const weeks = getWeeksOfMonth(month);

    return (
      <Month>
        <WeekDayName />
        <Spacer height={1} />
        {weeks.map((week, index) => renderWeekInMonth(week, month, index))}
      </Month>
    );
  };

  return (
    <CalendarContainer>
      {modeSelectionType === "month" && (
        <MonthCalendar
          selectedMonth={selectedRange.startDate}
          onMonthPress={handleSelectDate}
        />
      )}
      {modeSelectionType !== "month" && (
        <>
          <MonthSelector
            currentMonth={currentMonth}
            setCurrentMonth={onMonthChange}
            isWide={hasDoubleMonthDisplay}
          />
          <Spacer height={4} />
          <DoubleMonthContainer>
            {renderMonth(currentMonth)}
            {hasDoubleMonthDisplay && (
              <>
                <Spacer width={12} />
                {renderMonth(getNextMonth(currentMonth))}
              </>
            )}
          </DoubleMonthContainer>
        </>
      )}
    </CalendarContainer>
  );
};

const WeekDayName = () => {
  const { dayNamesShort } = useCalendarTranslation();

  // Our week starts with monday, whereas in the i18n standard it starts with sunday, thus we need to reorder the days
  const orderDays = [...dayNamesShort.slice(1), dayNamesShort[0]];

  const renderDayName = () =>
    orderDays.map((day, index) => <DayName key={index}>{day}</DayName>);

  return <Week>{renderDayName()}</Week>;
};

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
  isWide,
}: {
  currentMonth: Date;
  setCurrentMonth: (currentMonth: Date) => void;
  isWide: boolean;
}) => {
  const { formatToLongMonthYear } = useDateFormat();

  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  return (
    <MonthHeader>
      <Pressable
        onPress={() => changeMonth(-1)}
        accessibilityLabel="mois précédent"
      >
        <ChevronLeftIcon />
      </Pressable>
      <MonthNameContainer>
        <MonthName>{formatToLongMonthYear(currentMonth)}</MonthName>
      </MonthNameContainer>
      {isWide && (
        <>
          <MonthNameSpacer />
          <MonthNameContainer>
            <MonthName>
              {formatToLongMonthYear(getNextMonth(currentMonth))}
            </MonthName>
          </MonthNameContainer>
        </>
      )}
      <Pressable
        onPress={() => changeMonth(1)}
        accessibilityLabel="mois suivant"
      >
        <ChevronRightIcon />
      </Pressable>
    </MonthHeader>
  );
};

const CalendarContainer = styled.View({});

const DayBox = styled(Pressable)({
  flex: 1,
  paddingVertical: 2,
});

const DayContainer = styled.View<{ selectedState: DaySelectionState }>(
  ({ selectedState, theme }) => {
    const commonStyle = {
      alignItems: "center",
      justifyContent: "center",
      height: 7 * theme.gridUnit,
    };

    if (selectedState === "selected") {
      return {
        ...commonStyle,
        borderRadius: theme.borders.radius.m,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primaryLight,
      };
    }

    if (selectedState === "inBetween") {
      return {
        ...commonStyle,
        backgroundColor: theme.colors.contrastLight,
      };
    }

    if (selectedState === "weekStart") {
      return {
        ...commonStyle,
        borderTopLeftRadius: theme.borders.radius.m,
        borderBottomLeftRadius: theme.borders.radius.m,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: theme.colors.primary,
      };
    }

    if (selectedState === "weekEnd") {
      return {
        ...commonStyle,
        borderTopRightRadius: theme.borders.radius.m,
        borderBottomRightRadius: theme.borders.radius.m,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: theme.colors.primary,
      };
    }

    if (selectedState === "inWeek") {
      return {
        ...commonStyle,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.primary,
      };
    }

    return commonStyle;
  }
);

const MonthName = styled(Typo.LabelSmall)({
  textAlign: "center",
});

const MonthNameContainer = styled.View({
  flex: 1,
});

const DayName = styled(Typo.ParagraphSmall)(({ theme }) => ({
  color: theme.colors.defaultLight,
  textAlign: "center",
  flex: 1,
}));

const DayText = styled(Typo.LabelSmall)<{
  selectedState: DayStatus;
}>(({ theme, selectedState }) => {
  // styled is unproperly typed for now, so we need to cast the selectedState
  // TODO remove the cast when styled is properly typed
  const typedStatus = selectedState as DayStatus;

  return {
    color: getTextColorMap(theme)[typedStatus],
    textAlign: "center",
  };
});

const Week = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
});

const Month = styled.View({
  flex: 1,
});

const MonthHeader = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 6 * theme.gridUnit,
}));

const DoubleMonthContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
});

const MonthNameSpacer = styled.View(({ theme }) => ({
  width: theme.gridUnit * 24,
}));

const getTextColorMap = (theme: ColasTheme): Record<DayStatus, string> => ({
  selected: theme.colors.contrast,
  inBetween: theme.colors.primary,
  weekStart: theme.colors.primary,
  weekEnd: theme.colors.primary,
  inWeek: theme.colors.primary,
  today: theme.colors.primary,
  notInMonth: theme.colors.defaultClear,
  notSelectable: theme.colors.defaultClear,
  hidden: "transparent",
  default: theme.colors.default,
});
