import { Typo } from '@colas/design-system/src/atoms/Typo/Typo.component';
import styled from '@colas/design-system/src/libs/styled-components';
import { CalendarModeSelectionType } from '@colas/design-system/src/molecules/Calendar/DoubleCalendar.type';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

export const ModeSelectorTab = ({
  selectedMode,
  onSelectMode,
}: {
  selectedMode: CalendarModeSelectionType;
  onSelectMode: (mode: CalendarModeSelectionType) => void;
}) => {
  const { i18n } = useLingui();

  return (
    <>
      <ModeSelectorTabContainer>
        <TabItem onPress={() => onSelectMode('jobStart')} isSelected={selectedMode === 'jobStart'}>
          <TabItemText numberOfLines={1}>
            {i18n._(
              t({
                id: `Job start`,
                comment: 'Mode selector for the calendar',
              })
            )}
          </TabItemText>
        </TabItem>
        <TabItem onPress={() => onSelectMode('day')} isSelected={selectedMode === 'day'}>
          <TabItemText numberOfLines={1}>
            {i18n._(
              t({
                id: `Day`,
                comment: 'Mode selector for the calendar',
              })
            )}
          </TabItemText>
        </TabItem>
        <TabItem onPress={() => onSelectMode('week')} isSelected={selectedMode === 'week'}>
          <TabItemText numberOfLines={1}>
            {i18n._(
              t({
                id: `Week`,
                comment: 'Mode selector for the calendar',
              })
            )}
          </TabItemText>
        </TabItem>
        <TabItem onPress={() => onSelectMode('month')} isSelected={selectedMode === 'month'}>
          <TabItemText numberOfLines={1}>
            {i18n._(
              t({
                id: `Month`,
                comment: 'Mode selector for the calendar',
              })
            )}
          </TabItemText>
        </TabItem>
        <TabItem onPress={() => onSelectMode('flexible')} isSelected={selectedMode === 'flexible'}>
          <TabItemText numberOfLines={1}>
            {i18n._(
              t({
                id: `Flexible`,
                comment: 'Mode selector for the calendar',
              })
            )}
          </TabItemText>
        </TabItem>
      </ModeSelectorTabContainer>
      <Separator />
    </>
  );
};

const Separator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.contrastLight,
}));

const ModeSelectorTabContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 4 * theme.gridUnit,
  gap: 2 * theme.gridUnit,
}));

const TabItemText = styled(Typo.LabelSmall)({
  textAlign: 'center',
});

const TabItem = styled.Pressable<{ isSelected: boolean }>(({ isSelected, theme }) => ({
  paddingVertical: 2 * theme.gridUnit,
  borderRadius: theme.borders.radius.xxl,
  backgroundColor: isSelected ? theme.colors.primaryClear : theme.colors.contrastLight,
  borderWidth: isSelected ? 1 : 0,
  borderColor: theme.colors.primary,
  flex: 1,
}));
