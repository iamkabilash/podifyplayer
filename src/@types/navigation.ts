interface NewUserResponse {
  id: string;
  name: string;
  email: string;
}

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Verification: {userInfo: NewUserResponse};
};

export type ProfileNavigatorStackParamList = {
  Profile: undefined;
  ProfileSettings: undefined;
  Verification: {userInfo: NewUserResponse};
};
