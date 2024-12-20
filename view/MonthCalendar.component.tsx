import { Typo } from '@colas/design-system/src/atoms/Typo/Typo.component';
import { ChevronLeftIcon } from '@colas/design-system/src/icons/navigation/ChevronLeftIcon.component';
import { ChevronRightIcon } from '@colas/design-system/src/icons/navigation/ChevronRightIcon.component';
import styled from '@colas/design-system/src/libs/styled-components';
import { sameMonth } from '@colas/design-system/src/molecules/Calendar/calendar.utils';
import { useAllMonths } from '@colas/design-system/src/molecules/Calendar/hooks/useAllMonths';
import { Pressable } from '@colas/design-system/src/primitives/Pressable/Pressable.component';
import { chunk } from 'lodash';
import { useState } from 'react';

export const MonthCalendar = ({
  selectedMonth,
  onMonthPress: onMonthChange,
}: {
  selectedMonth: Date;
  onMonthPress: (month: Date) => void;
}) => {
  const [year, setYear] = useState(selectedMonth.getFullYear());

  const allMonths = useAllMonths();

  const monthArray = chunk(allMonths, 4);

  return (
    <>
      <YearSelector currentYear={year} setCurrentYear={setYear} />
      <AllMonthContainer>
        {monthArray.map((months, index) => (
          <MonthRow key={index}>
            {months.map((month) => {
              const monthDate = new Date(year, month.monthNumber, 1);

              const isMonthSelected = sameMonth(monthDate, selectedMonth);

              return (
                <MonthButton
                  key={month.monthNumber}
                  isSelected={isMonthSelected}
                  onPress={() => onMonthChange(monthDate)}
                >
                  <MonthName isSelected={isMonthSelected}>{month.monthName}</MonthName>
                </MonthButton>
              );
            })}
          </MonthRow>
        ))}
      </AllMonthContainer>
    </>
  );
};

const YearSelector = ({
  currentYear,
  setCurrentYear,
}: {
  currentYear: number;
  setCurrentYear: (currentYear: number) => void;
}) => {
  return (
    <YearHeader>
      <Pressable
        onPress={() => setCurrentYear(currentYear - 1)}
        accessibilityLabel="année précédente"
      >
        <ChevronLeftIcon />
      </Pressable>
      <YearNameContainer>
        <YearName>{currentYear.toString()}</YearName>
      </YearNameContainer>
      <Pressable
        onPress={() => setCurrentYear(currentYear + 1)}
        accessibilityLabel="année suivante"
      >
        <ChevronRightIcon />
      </Pressable>
    </YearHeader>
  );
};

const MonthRow = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 4 * theme.gridUnit,
}));

const AllMonthContainer = styled.View(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingHorizontal: 4 * theme.gridUnit,
  gap: 4 * theme.gridUnit,
  paddingVertical: 4 * theme.gridUnit,
}));

const MonthButton = styled.Pressable<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 2 * theme.gridUnit,
  backgroundColor: isSelected ? theme.colors.primaryClear : undefined,
  borderWidth: 1,
  borderColor: isSelected ? theme.colors.primaryLight : theme.colors.defaultClear,
  borderRadius: theme.borders.radius.m,
}));

const MonthName = styled(Typo.LabelSmall)({
  textAlign: 'center',
});

const YearHeader = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 6 * theme.gridUnit,
}));

const YearNameContainer = styled.View({
  flex: 1,
});

const YearName = styled(Typo.LabelSmall)({
  textAlign: 'center',
});
