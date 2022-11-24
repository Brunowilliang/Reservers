import React, { useState } from 'react';
import { HStack, ITextProps } from 'native-base';
import { colors, fonts } from '@styles/theme';
import { FilledTextField } from 'rn-material-ui-textfield'
import { CaretDown } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

type Props = ITextProps & {
  label: string;
  select?: boolean;
  password?: boolean;
  small?: boolean;
  errorMessage?: string;
  prefix?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search' | undefined;
  onChangeText?: (text: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  value?: string;
  helpText?: string;
  textRight?: string;
  iconRight?: string;
  invisible?: boolean;
  iconLeft?: string;
  width?: string;
  iconRightOnPress?: () => void;
  iconLeftOnPress?: () => void;
  onPress?: () => void;
  bg?: string;
  maxLength?: number;
}


export const maskStringBRL = (value: string) => {
  let v: any = value.replace(/\D/g, '');
  v = (v / 100).toFixed(2) + '';
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  return v;
}


//   return value
//     .replace(/\D/g, '')
//     .replace(/(\d{1})(\d{14})$/, '$1.$2')
//     .replace(/(\d{1})(\d{11})$/, '$1.$2')
//     .replace(/(\d{1})(\d{8})$/, '$1.$2')
//     .replace(/(\d{1})(\d{5})$/, '$1.$2')
//     .replace(/(\d{1})(\d{1,2})$/, '$1,$2')
//     .replace(/(,)(\d{2})\d+?$/, '$1$2');
// };

export const maskBRL = (value: number) => {

  // e se for negativo adicionar o sinal de menos
  const isNegative = value < 0;
  const valueString = value.toString();
  
  return value
  .toString()
    .length === 1
    ? `0,0${value}`
    : value.toString().length === 2
    ? `0,${value}`
    : `${maskStringBRL(value.toString())}`;
};

const Input = (p: Props) => {
  const [showPassword, setShowPassword] = useState(true);

  const ShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
      <HStack
        h={p.small ? '46px' : '56px'}
        w={p.width || '100%'}
        bg={colors.secondary}
        px={4}
        mb={p.errorMessage ? 5 : 0 || p.helpText ? 5 : 0}
        space={3}
        rounded="14px"
        display={p.invisible ? 'none' : 'flex'}
        borderWidth={1}
        borderColor={p.errorMessage ? colors.attention : colors.secondary}
        pointerEvents={p.select ? 'none' : 'auto'}
        alignItems="center"
        {...p}
      >
        <FilledTextField
          label={p.label}
          title={p.helpText}
          onChangeText={p.onChangeText}
          value={p.value}
          tintColor={colors.grey400}
          baseColor={colors.grey400}
          keyboardType={p.keyboardType}
          fontSize={16}
          maxLength={p.maxLength}
          labelFontSize={13}
          prefix={p.prefix}
          activeLineWidth={0}
          lineWidth={0}
          autoCorrect={false}
          autoCapitalize={p.autoCapitalize}
          error={p.errorMessage}
          errorColor={colors.attention}
          secureTextEntry={p.password && showPassword}
          labelTextStyle={{
            fontFamily: fonts.medium,
            color: colors.grey400,
            lineHeight: 18,
          }}
          titleTextStyle={{
            fontFamily: fonts.medium,
          }}
          style={{
            fontFamily: fonts.medium,
            color: p.errorMessage ? colors.attention : colors.grey400,
            marginBottom: p.small ? 3 : 0,
          }}
          containerStyle={{
            flex: 1,
            height: 56,
          }}
          inputContainerStyle={{
            backgroundColor: colors.transparent,
          }}
          affixTextStyle={{
            fontFamily: fonts.semibold,
          }}
          contentInset={{
            left: 0,
            right: 0,
          }}
        />
        {p.select && (
          <CaretDown size={25} weight="bold" color={colors.grey400} />
        )}
      </HStack>
  );
}

export default Input