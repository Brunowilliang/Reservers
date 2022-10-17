import { showMessage } from "react-native-flash-message";
import { colors, fonts } from '@styles/theme';

type Props = {
  titulo: string;
  descricao?: string;
  type: 'success' | 'warning' | 'danger' | 'info';
}

export default function Toast({ titulo, descricao, type }:Props) {
  showMessage({
    message: titulo,
    description: descricao,
    type: type,
    icon: type,
    floating: true,
    duration: 5000,
    style: {
      borderWidth: 0,
      alignItems: "center",
    },
    titleStyle: {
      color: colors.white,
      fontSize: 16,
      fontFamily: fonts.bold,
      marginBottom: 0,
    },
    textStyle: {
      color: colors.white,
      fontSize: 15,
      fontFamily: fonts.medium,
      marginBottom: 0,
    },
  })
}
  