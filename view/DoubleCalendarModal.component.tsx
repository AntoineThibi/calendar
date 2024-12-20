import { Modal } from '@colas/design-system/src/atoms/Modal/Modal.component'; // Globalement une react-native-modal
import styled from '@colas/design-system/src/libs/styled-components'; // styled-components
import { DoubleCalendarModalProps } from './DoubleCalendarModal.interface.ts';
import { PropsWithChildren } from 'react';

export const DoubleCalendarModal = ({
  children,
  isVisible,
  onClose,
}: PropsWithChildren<DoubleCalendarModalProps>) => {
  return (
    <Modal isModalVisible={isVisible} onBackdropPress={onClose}>
      <ModalContainer pointerEvents="box-none">{children}</ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
});
