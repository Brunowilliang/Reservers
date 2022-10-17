import React from 'react'
import { MotiView } from 'moti';
import { Pressable, IPressableProps, Spinner } from 'native-base';
import Text from './text';
import { colors } from '@styles/theme';
import { MotiPressable } from 'moti/interactions';


type Props = IPressableProps & {
  onPress?: () => void;
  title?: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};


const Button = (p: Props) => {
  
  const animate = ({ pressed }: any) => {
    'worklet'
    return {
      scale: pressed ? 0.98 : 1,
      opacity: pressed ? 0.5 : 1,
    }
  }

  const transition = () => {
    'worklet'
    return {
      type: 'timing',
      duration: 100,
    }
  }

  return (
    <MotiView style={{width: "100%"}}>
      <MotiPressable onPress={p.onPress} disabled={p.disabled} animate={animate} transition={transition as any}>
        <Pressable bg={p.variant === "secondary" ? colors.transparent : colors.primary} w="100%" h="56px" rounded='14px' alignItems="center" justifyContent="center" {...p}>
          {p.isLoading
            ? <Spinner color={colors.white} />
            : <Text h4 color={colors.white} semibold>{p.title}</Text>
          }
        </Pressable>
      </MotiPressable>
    </MotiView>
  )
}

export default Button