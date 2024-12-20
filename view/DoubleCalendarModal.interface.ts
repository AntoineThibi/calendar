export type DoubleCalendarModalProps = {
  isVisible: boolean;
  onClose: () => void;
  /**
   * On Web we want a dropdown behavior
   * This props is only used for web to position the modal.
   */
  webStyle?: { top?: number; left?: number; bottom?: number; right?: number };
};
