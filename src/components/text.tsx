import React from 'react';
import { colors, fonts } from '@styles/theme';
import { ITextProps, Text as NativeBaseText } from 'native-base';

type Props = ITextProps & {
  children?: React.ReactNode | string;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;

  color?: string;

  regular?: boolean;
  medium?: boolean;
  semibold?: boolean;
  bold?: boolean;
}

const Text = (p: Props) => {
  return (
    <NativeBaseText
      fontSize={p.h1 && 24 || p.h2 && 20 || p.h3 && 18 || p.h4 && 16 || p.h5 && 14 || p.h6 && 12 || 16}
      fontFamily={p.bold && fonts.bold || p.semibold && fonts.semibold || p.medium && fonts.medium || fonts.regular && fonts.regular || fonts.medium}
      color={p.color || colors.white}
      {...p}
    >
      {p.children}
    </NativeBaseText>
  )
}

export default Text;