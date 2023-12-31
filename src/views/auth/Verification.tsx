import {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, TextInput, Keyboard, Text} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OtpField from '@ui/OtpField';
import AppButton from '@ui/AppButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  AuthStackParamList,
  ProfileNavigatorStackParamList,
} from 'src/@types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getClient} from 'src/api/client';
import colors from '@utils/colors';
import catchAsyncError from 'src/api/catchError';
import {updateNotifocation} from 'src/store/notification';
import {useDispatch} from 'react-redux';
import {updateProfile} from 'src/store/auth';

type Props = NativeStackScreenProps<
  AuthStackParamList | ProfileNavigatorStackParamList,
  'Verification'
>;
type PossibleScreens = {
  ProfileSettings: undefined;
  SignIn: undefined;
};

const otpTextFields = new Array(6).fill('');

const Verification: FC<Props> = props => {
  const [otp, setOtp] = useState([...otpTextFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const [allowNewOtpRequest, setAllowNewOtpRequest] = useState(false);

  const {userInfo} = props.route.params;

  const navigation = useNavigation<NavigationProp<PossibleScreens>>();
  const dispatch = useDispatch();

  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === 'Backspace') {
      // move to previous if the current field is empty
      if (!newOtp[index]) {
        setActiveOtpIndex(index - 1);
      }
      newOtp[index] = '';
    } else {
      // move to next
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }
    setOtp([...newOtp]);
  };

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      setOtp([...newOtp]);
    }
  };

  const isValidOtp = otp.every(value => value.trim());
  const handleSubmitOtp = async () => {
    if (!isValidOtp)
      return dispatch(
        updateNotifocation({message: 'Invalid OTP', type: 'error'}),
      );
    setSubmitting(true);
    try {
      const client = await getClient();
      const {data} = await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });
      dispatch(updateProfile({...userInfo, verified: true}));
      dispatch(updateNotifocation({message: data.message, type: 'success'}));

      const {routeNames} = navigation.getState();
      if (routeNames.includes('SignIn')) {
        navigation.navigate('SignIn');
      }
      if (routeNames.includes('ProfileSettings')) {
        navigation.navigate('ProfileSettings');
      }
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotifocation({message: errorMessage, type: 'error'}));
    }
    setSubmitting(false);
  };

  const handleRequestOtp = async () => {
    setCountDown(60);
    setAllowNewOtpRequest(false);
    try {
      const client = await getClient();
      const {data} = await client.post('/auth/reverify-email', {
        userId: userInfo.id,
      });
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotifocation({message: errorMessage, type: 'error'}));
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

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
    <AuthFormContainer
      heading="Email Verification"
      subHeading="Please enter OTP received in email">
      <View style={styles.formContainer}>
        <View style={styles.otpContainer}>
          {otpTextFields.map((_, index) => (
            <OtpField
              ref={activeOtpIndex === index ? inputRef : null}
              key={index}
              placeholder="*"
              onKeyPress={({nativeEvent}) => {
                handleChange(nativeEvent.key, index);
              }}
              onChangeText={handlePaste}
              keyboardType="numeric"
              value={otp[index] || ''}
            />
          ))}
        </View>
        <AppButton
          isBusy={submitting}
          title="Submit OTP"
          onPress={handleSubmitOtp}
          style={{borderRadius: 20}}
        />
        <View style={styles.linkContainer}>
          {!allowNewOtpRequest && (
            <Text style={styles.countDown}>{countDown} seconds</Text>
          )}
          <AppLink
            active={allowNewOtpRequest}
            title="Resend OTP"
            onPress={handleRequestOtp}
          />
        </View>
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  linkContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
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

export default Verification;
