import styled from "@colas/design-system/src/libs/styled-components";
import { DoubleCalendarModalProps } from "./DoubleCalendarModal.interface.ts";
import { PropsWithChildren } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import ModalRN from "react-native-modal";

// Pour le web
// Pas sur ce que ce soit ouf
export const DoubleCalendarModal = ({
  children,
  isVisible,
  onClose,
  webStyle,
}: PropsWithChildren<DoubleCalendarModalProps>) => {
  return (
    <WebCalendarModal
      isVisible={isVisible}
      onClose={onClose}
      webStyle={webStyle}
    >
      {children}
    </WebCalendarModal>
  );
};

const WebCalendarModal = ({
  children,
  isVisible,
  onClose,
  webStyle,
}: PropsWithChildren<DoubleCalendarModalProps>) => {
  const handleBackdropPress = (event: GestureResponderEvent) => {
    onClose();

    /**
     * Manually trigger a click event for underlying elements
     * Using a setTimeout to ensure the modal is closed before the click event is triggered
     */
    setTimeout(() => {
      const touchEvent = event.nativeEvent;
      const targetElement = document.elementFromPoint(
        touchEvent.pageX,
        touchEvent.pageY
      ) as HTMLElement; // We know it's an HTMLElement because the WebCalendarModal is only used on web

      if (targetElement && typeof targetElement.click === "function") {
        targetElement.click();
      }
    }, 100);
  };

  return (
    <ModalRN
      avoidKeyboard
      isVisible={isVisible}
      style={styles.modal}
      // For this dropdown, we don't want any animation
      animationInTiming={1}
      animationOutTiming={1}
      customBackdrop={<CustomBackdrop onPress={handleBackdropPress} />}
    >
      <WebContainer
        pointerEvents="box-none"
        top={webStyle?.top}
        left={webStyle?.left}
        bottom={webStyle?.bottom}
        right={webStyle?.right}
      >
        {children}
      </WebContainer>
    </ModalRN>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});

const CustomBackdrop = styled.Pressable({
  flex: 1,
});

const WebContainer = styled.View<{
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}>(({ theme, top, left, bottom, right }) => ({
  ...theme.shadow?.shadowDark,
  borderRadius: theme.borders.radius.l,
  position: "absolute",
  top,
  left,
  bottom,
  right,
}));
