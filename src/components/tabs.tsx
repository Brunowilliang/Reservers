import React from 'react'
import SwitchSelector from 'react-native-switch-selector';
import { colors } from '@styles/theme';

type Props = {
  options: Array<{ label: string, value: string }>;
  onPress: (value: string | number) => void;
  initial: number;
  bg?: string;
}

const Tabs = (p: Props) => {
  return (
    //@ts-ignore
    <SwitchSelector
      textStyle={{ color: colors.grey400, fontWeight: "500" }}
      selectedTextStyle={{ color: colors.white }}
      textContainerStyle={{ height: 60 }}
      selectedTextContainerStyle={{ height: 60 }}
      bold
      backgroundColor={colors.secondary}
      buttonColor={p.bg || colors.primary}
      borderColor={colors.secondary}
      borderWidth={0}
      height={60}
      borderRadius={14}
      hasPadding
      valuePadding={4}
      fontSize={16}
      initial={p.initial}
      animationDuration={200}
      onPress={p.onPress}
      options={p.options}
    />
  )
}

export default Tabs