import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import {FC, useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';

import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

const signInSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('Password is missing')
    .min(8, 'Password is too short')
    .required('Password is required'),
});

const SignIn: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);

  return (
    <AuthFormContainer heading="Welcome back!" subHeading="">
      <Form
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={signInSchema}>
        <View style={styles.formContainer}>
          {/* email */}
          <AuthInputField
            name="email"
            label="Email"
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={{marginBottom: 8}}
          />
          {/* password */}
          <AuthInputField
            name="password"
            label="Password"
            placeholder="*********"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={{marginBottom: 40}}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={() => {
              setSecureEntry(!secureEntry);
            }}
          />
          <SubmitBtn title="Sign In" />
          <View style={styles.linkContainer}>
            <AppLink title="Sign Up" onPress={() => {}} />
            <AppLink title="Forgot Password" onPress={() => {}} />
          </View>
        </View>
      </Form>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 12,
  },
});

export default SignIn;
