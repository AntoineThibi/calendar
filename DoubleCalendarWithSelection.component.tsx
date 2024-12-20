import { Button } from '@colas/design-system/src/atoms/Button/Button.component';
import styled from '@colas/design-system/src/libs/styled-components';
import { CalendarModeSelectionType } from '@colas/design-system/src/molecules/Calendar/DoubleCalendar.type';
import { ModeSelectorTab } from '@colas/design-system/src/molecules/Calendar/ModeSelectorTab.component';
import { DoubleCalendarView } from '@colas/design-system/src/molecules/Calendar/view/DoubleCalendarView.component';
import { useColasTheme } from '@colas/design-system/src/provider/ColasTheme/useColasTheme.hook';
import { DateRange } from '@colas/design-system/src/types/dateRange';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useState } from 'react';
import { getWeekOfDay } from './calendar.utils';

interface Props {
  selectedRange: DateRange;
  onChangeRange: (range: DateRange) => void;
  /**
   * Display a header with the mode selector
   * Only available on wide screens
   */
  hasModeSelectorHeader?: boolean;
  initialModeSelectionType?: CalendarModeSelectionType;
  /**
   * On tablet and desktop, the calendar can be displayed in single or double mode
   * On mobile, the calendar is always displayed in single mode
   */
  displayMode: 'double' | 'single';
}

export const DoubleCalendarWithSelection = ({
  selectedRange,
  onChangeRange,
  initialModeSelectionType: modeSelectionType = 'flexible',
  hasModeSelectorHeader = false,
  displayMode,
}: Props) => {
  const { isMobile } = useColasTheme();
  const { i18n } = useLingui();

  const [currentMonth, setCurrentMonth] = useState(selectedRange.endDate);

  const [temporaryRange, setTemporaryRange] = useState<DateRange>(selectedRange);

  const [selectedMode, setSelectedMode] = useState<CalendarModeSelectionType>(modeSelectionType);

  const isWide = !isMobile && displayMode === 'double';

  const handleChangeSelectedMode = (mode: CalendarModeSelectionType) => {
    if (mode === 'flexible') {
      setSelectedMode('flexible');
      setCurrentMonth(temporaryRange.endDate);
      return;
    }

    if (mode === 'week') {
      const { startOfWeek, endOfWeek } = getWeekOfDay(temporaryRange.endDate);

      setSelectedMode('week');
      setTemporaryRange({ startDate: startOfWeek, endDate: endOfWeek });
      setCurrentMonth(startOfWeek);
      return;
    }

    if (mode === 'day') {
      setSelectedMode('day');
      setTemporaryRange({ startDate: temporaryRange.endDate, endDate: temporaryRange.endDate });
      setCurrentMonth(temporaryRange.endDate);
      return;
    }

    if (mode === 'month') {
      setSelectedMode('month');
      const selectedMonth = temporaryRange.endDate;

      setTemporaryRange({
        startDate: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1),
        endDate: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0),
      });
      setCurrentMonth(temporaryRange.endDate);
      return;
    }

    if (mode === 'jobStart') {
      const endDateForJobStart = new Date();
      setSelectedMode('jobStart');
      setTemporaryRange({
        startDate: new Date('2000-01-01'),
        endDate: endDateForJobStart,
      });
      setCurrentMonth(endDateForJobStart);
      return;
    }
  };

  return (
    <Container isWide={isWide}>
      {hasModeSelectorHeader && !isMobile && (
        <ModeSelectorTab selectedMode={selectedMode} onSelectMode={handleChangeSelectedMode} />
      )}
      <CalendarContainer>
        <DoubleCalendarContainer>
          <DoubleCalendarView
            focusedMonth={currentMonth}
            onFocusOnMonth={setCurrentMonth}
            selectedRange={temporaryRange}
            onChangeRange={setTemporaryRange}
            modeSelectionType={selectedMode}
            displayMode={displayMode}
          />
        </DoubleCalendarContainer>
        <ValidateContainer>
          <Button
            label={i18n._(
              t({
                id: `Validate`,
                comment: 'Validate button in calendar',
              })
            )}
            onPress={() => onChangeRange(temporaryRange)}
          />
        </ValidateContainer>
      </CalendarContainer>
    </Container>
  );
};

const Container = styled.View<{ isWide: boolean }>(({ theme, isWide }) => ({
  borderRadius: 2 * theme.gridUnit,
  backgroundColor: theme.colors.contrast,
  paddingVertical: 4 * theme.gridUnit,
  gap: 4 * theme.gridUnit,
  width: isWide ? 592 : 312,
}));

const CalendarContainer = styled.View(({ theme }) => ({
  paddingHorizontal: 4 * theme.gridUnit,
}));

const ValidateContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'flex-end',
});

const DoubleCalendarContainer = styled.View(({ theme }) => ({
  paddingHorizontal: 4 * theme.gridUnit,
}));
