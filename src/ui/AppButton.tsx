import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, Pressable, Text, StyleProp, ViewStyle} from 'react-native';
import Loader from './Loader';

interface Props {
  title: string;
  onPress?(): void;
  isBusy?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AppButton: FC<Props> = ({title, onPress, isBusy, style}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      {!isBusy ? <Text style={styles.title}>{title}</Text> : <Loader />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});

export default AppButton;
