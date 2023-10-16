import colors from '@utils/colors';
import {FC} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  ScrollViewPropsAndroid,
} from 'react-native';
import Loader from './Loader';

interface Props {
  title: string;
  onPress?(): void;
  isBusy?: boolean;
}

const AppButton: FC<Props> = ({title, onPress, isBusy}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
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
    borderRadius: 20,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});

export default AppButton;
