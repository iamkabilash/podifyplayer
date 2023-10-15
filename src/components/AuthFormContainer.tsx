import CircleUi from '@ui/CircleUi';
import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}

const AuthFormContainer: FC<Props> = ({children, heading, subHeading}) => {
  return (
    <View style={styles.container}>
      <CircleUi size={200} position="top-left" />
      <CircleUi size={150} position="top-right" />
      <CircleUi size={150} position="bottom-left" />
      <CircleUi size={200} position="bottom-right" />
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: 120}}
          resizeMode="contain"
        />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeading: {
    color: colors.CONTRAST,
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default AuthFormContainer;
