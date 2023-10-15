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
};

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid email')
    .required('Email is required'),
});

const ForgotPassword: FC<Props> = props => {
  return (
    <AuthFormContainer
      heading="Forgot Password!"
      subHeading="Let's reset your password.">
      <Form
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={forgotPasswordSchema}>
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
          <SubmitBtn title="Send Password Reset Link" />
          <View style={styles.linkContainer}>
            <AppLink title="Sign Up" onPress={() => {}} />
            <AppLink title="Sign In" onPress={() => {}} />
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

export default ForgotPassword;
