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
  name: '',
  email: '',
  password: '',
};

const signUpSchema = yup.object({
  name: yup
    .string()
    .trim('Name is missing')
    .min(3, 'Name is too short')
    .required('Name is required'),
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('Password is missing')
    .min(8, 'Password is too short')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple',
    )
    .required('Password is required'),
});

const SignUp: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);

  return (
    <AuthFormContainer
      heading="Welcome!"
      subHeading="Let's get started by creating an account.">
      <Form
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={signUpSchema}>
        <View style={styles.formContainer}>
          {/* name */}
          <AuthInputField
            name="name"
            label="Name"
            placeholder="Your Name"
            containerStyle={{marginBottom: 8}}
          />
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
          <SubmitBtn title="Sign Up" />
          <View style={styles.linkContainer}>
            <AppLink title="Sign In" onPress={() => {}} />
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

export default SignUp;
