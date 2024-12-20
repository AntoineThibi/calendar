import { DoubleCalendarView } from '@colas/design-system/src/molecules/Calendar/view/DoubleCalendarView.component';
import { DateRange } from '@colas/design-system/src/types/dateRange';
import { useState } from 'react';

type Props = {
  selectedDate: Date;
  onChangeDate: (range: Date) => void;
  minDate?: Date;
  maxDate?: Date;
};

export const SingleDateCalendar = ({ selectedDate, onChangeDate, minDate, maxDate }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const selectedRange = {
    startDate: selectedDate,
    endDate: selectedDate,
  };

  const onChangeRange = (range: DateRange) => {
    onChangeDate(range.startDate);
  };

  return (
    <DoubleCalendarView
      selectedRange={selectedRange}
      onChangeRange={onChangeRange}
      focusedMonth={currentMonth}
      onFocusOnMonth={setCurrentMonth}
      displayMode="single"
      modeSelectionType="day"
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};
