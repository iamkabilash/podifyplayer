import {NavigationProp, useNavigation} from '@react-navigation/native';
import AppLink from '@ui/AppLink';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';
import {getClient} from 'src/api/client';
import {getAuthState} from 'src/store/auth';

interface Props {
  time?: number;
  activeAtFirst?: boolean;
  linkTitle: string;
  userId?: string;
}

const ReverificationLink: FC<Props> = ({
  linkTitle,
  time = 60,
  activeAtFirst = false,
  userId,
}) => {
  const [countDown, setCountDown] = useState(time);
  const [allowNewOtpRequest, setAllowNewOtpRequest] = useState(activeAtFirst);
  const {profile} = useSelector(getAuthState);

  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const handleRequestOtp = async () => {
    setCountDown(60);
    setAllowNewOtpRequest(false);
    try {
      const client = await getClient();
      const {data} = await client.post('/auth/reverify-email', {
        userId: userId || profile?.id,
      });

      navigate('Verification', {
        userInfo: {
          email: profile?.email || '',
          name: profile?.name || '',
          id: userId || profile?.id || '',
        },
      });
    } catch (error) {
      console.log('Error in Re-verify email: ', error);
    }
  };

  useEffect(() => {
    if (allowNewOtpRequest) return;

    const intervalId = setInterval(() => {
      setCountDown(oldCountDown => {
        if (oldCountDown <= 0) {
          setAllowNewOtpRequest(true);
          clearInterval(intervalId);
          return 0;
        }
        return oldCountDown - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [allowNewOtpRequest]);

  return (
    <View style={styles.linkContainer}>
      {countDown > 0 && !allowNewOtpRequest && (
        <Text style={styles.countDown}>{countDown} seconds</Text>
      )}
      <AppLink
        active={allowNewOtpRequest}
        title={linkTitle}
        onPress={handleRequestOtp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  otpContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 8,
  },
});

export default ReverificationLink;
