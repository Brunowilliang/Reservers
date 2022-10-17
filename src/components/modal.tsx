import { colors } from '@styles/theme';
import { Box, FlatList, HStack, IBoxProps, IScrollViewProps } from 'native-base';
import * as Progress from 'react-native-progress';
import React from 'react';
import { RefreshControl } from 'react-native';
import Text from './text';
import Dialog, { ModalProps } from "react-native-modal";

type Props = ModalProps & {
  isVisible: boolean;
  isClose: () => void;
  children: any;
}

const Modal = (p:Props) => {
  return (
    <Dialog
      {...p}
      isVisible={p.isVisible}
      onBackdropPress={p.isClose}
      onTouchCancel={p.isClose}
      swipeThreshold={100}
      animationIn="fadeInUp"
      animationOut="fadeOut"
      onSwipeComplete={p.isClose}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
      coverScreen={true}
      backdropColor={colors.background}
      backdropOpacity={0.5}
      swipeDirection="down"
    >
      {p.children}
    </Dialog>
  );
}

export default Modal;