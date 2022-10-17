import React from 'react'
import { MotiView } from 'moti';
import { Pressable as Press, IPressableProps } from 'native-base';
import { MotiPressable } from 'moti/interactions';


type Props = IPressableProps & {
  onPress?: () => void;
  disabled?: boolean;
  title?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
};

const Pressable = (props: Props) => {
  
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
    <MotiView>
      <MotiPressable onPress={props.onPress} disabled={props.disabled} animate={animate} transition={transition as any}>
        <Press w="auto" h="auto" alignItems="center" justifyContent="center" disabled={props.disabled} {...props}>
          {props.children}
        </Press>
      </MotiPressable>
    </MotiView>
  )
}

export default Pressable