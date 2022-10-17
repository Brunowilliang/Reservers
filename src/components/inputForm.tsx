import React, { useState } from 'react';
import { HStack, ITextProps } from 'native-base';
import { colors, fonts } from '@styles/theme';
import { FilledTextField } from 'rn-material-ui-textfield'
import { CaretDown } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { Control, Controller } from 'react-hook-form';

type Props = ITextProps & {
  label: string;
  select?: boolean;
  password?: boolean;
  small?: boolean;
  errorMessage?: string;
  prefix?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search' | undefined;
  onChangeText?: (text: string) => void;
  value?: string;
  helpText?: string;
  textRight?: string;
  iconRight?: string;
  iconLeft?: string;
  iconRightOnPress?: () => void;
  iconLeftOnPress?: () => void;
  onPress?: () => void;
  bg?: string;
  control: Control;
  name: string;
}

export const maskStringBRL = (value: string) => {
  let v: any = value.replace(/\D/g, '');
  v = (v / 100).toFixed(2) + '';
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  return v;
}

const InputForm = (p: Props) => {
  const [showPassword, setShowPassword] = useState(true);

  const ShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <TouchableOpacity onPress={p.onPress} activeOpacity={p.select ? 0.5 : 1}>
        <HStack
          h={p.small ? '46px' : '56px'}
          w="100%"
          bg={colors.secondary}
          px={4}
          mb={p.errorMessage ? 5 : 0 || p.helpText ? 5 : 0}
          space={3}
          rounded="14px"
          borderWidth={1}
          borderColor={p.errorMessage ? colors.attention : colors.secondary}
          pointerEvents={p.select ? 'none' : 'auto'}
          alignItems="center"
          {...p}
        >
          <Controller
            control={p.control}
            name={p.name}
            render={({ field: { onChange, onBlur, value } }) => (
              <FilledTextField
                label={p.label}
                title={p.helpText}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                tintColor={colors.black}
                baseColor={colors.grey400}
                keyboardType={p.keyboardType}
                fontSize={16}
                labelFontSize={13}
                prefix={p.prefix}
                activeLineWidth={0}
                lineWidth={0}
                autoCorrect={false}
                autoCapitalize="none"
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
                  color: p.errorMessage ? colors.attention : colors.black,
                  marginBottom: p.small ? 3 : 0,
                }}
                containerStyle={{ flex: 1, height: 56, }}
                inputContainerStyle={{ backgroundColor: colors.transparent, }}
                affixTextStyle={{ fontFamily: fonts.semibold, }}
                contentInset={{ left: 0, right: 0, }}
              />
            )}
          />
          {p.select && (
            <CaretDown size={25} weight="bold" color={colors.grey400} />
          )}
        </HStack>
    </TouchableOpacity>
  );
}

export default InputForm