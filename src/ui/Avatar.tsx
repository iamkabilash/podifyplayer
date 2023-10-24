import colors from '@utils/colors';
import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

interface Props {
  source?: string;
}

const Avatar: FC<Props> = ({source}) => {
  return (
    <View style={styles.container}>
      {source ? (
        <Image source={{uri: source}} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarImage}>
          <EntypoIcon name="mic" size={20} color={colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  avatarImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.CONTRAST,
  },
});

export default Avatar;
