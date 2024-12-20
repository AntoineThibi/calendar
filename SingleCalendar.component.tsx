import { CalendarModeSelectionType } from '@colas/design-system/src/molecules/Calendar/DoubleCalendar.type';
import { DoubleCalendarView } from '@colas/design-system/src/molecules/Calendar/view/DoubleCalendarView.component';
import { DateRange } from '@colas/design-system/src/types/dateRange';
import { useState } from 'react';

type Props = {
  selectedRange: DateRange;
  onChangeRange: (range: DateRange) => void;
  modeSelectionType?: CalendarModeSelectionType;
};

export const SingleCalendar = ({ selectedRange, onChangeRange, modeSelectionType }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(selectedRange.endDate);

  return (
    <DoubleCalendarView
      selectedRange={selectedRange}
      onChangeRange={onChangeRange}
      focusedMonth={currentMonth}
      onFocusOnMonth={setCurrentMonth}
      displayMode="single"
      modeSelectionType={modeSelectionType}
    />
  );
};
