import AppHeader from '@components/AppHeader';
import Avatar from '@ui/Avatar';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '@ui/AppButton';
import {getClient} from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {useDispatch, useSelector} from 'react-redux';
import {updateNotifocation} from 'src/store/notification';
import {Keys, removeFromAsyncStorage} from '@utils/asyncStorage';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from 'src/store/auth';
import deepEqual from 'deep-equal';
import ImagePicker from 'react-native-image-crop-picker';
import {getPermissionToReadImages} from '@utils/helper';
import ReverificationLink from '@components/ReverificationLink';

interface Props {}
interface ProfileInfo {
  name: string;
  avatar?: string;
}

const ProfileSettings: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState<ProfileInfo>({name: ''});
  const [isBusy, setIsBusy] = useState(false);
  const {profile} = useSelector(getAuthState);

  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar,
  });

  const dispatch = useDispatch();

  const handleLogout = async (fromAll?: boolean) => {
    dispatch(updateBusyState(true));
    try {
      const endpoint = `/auth/logout?fromAll=${fromAll ? 'yes' : ''}`;
      const client = await getClient();
      await client.post(endpoint);
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);
      dispatch(updateProfile(null));
      dispatch(updateLoggedInState(false));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotifocation({type: 'error', message: errorMessage}));
    }
    dispatch(updateBusyState(false));
  };

  const handleSubmit = async () => {
    setIsBusy(true);
    try {
      if (!userInfo)
        return dispatch(
          updateNotifocation({
            type: 'error',
            message: 'Profile name is required',
          }),
        );
      const formData = new FormData();
      formData.append('name', userInfo.name);

      if (userInfo.avatar) {
        formData.append('avatar', {
          name: 'avatar',
          type: 'image/jpeg',
          uri: userInfo.avatar,
        });
      }

      const client = await getClient({'Content-Type': 'multipart/form-data;'});
      const {data} = await client.post('/auth/update-profile', formData);
      dispatch(updateProfile(data.profile));
      dispatch(
        updateNotifocation({type: 'success', message: 'Profile updated'}),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotifocation({type: 'error', message: errorMessage}));
    }
    setIsBusy(false);
  };

  const handleImageSelect = async () => {
    try {
      await getPermissionToReadImages();
      const {path} = await ImagePicker.openPicker({
        cropping: true,
        width: 300,
        height: 300,
      });
      setUserInfo({...userInfo, avatar: path});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profile) setUserInfo({name: profile.name, avatar: profile.avatar});
  }, [profile]);

  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.settingsOptions}>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>Hey</Text>
          {profile?.verified ? (
            <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
          ) : (
            <ReverificationLink linkTitle="Verify" activeAtFirst />
          )}
        </View>
        <Text style={[styles.email, {marginBottom: 12}]}>
          Email: {profile?.email}
        </Text>
        <View style={styles.avatarContainer}>
          <Avatar source={profile?.avatar} />
          <Pressable onPress={handleImageSelect}>
            <Text style={styles.avatarUpdateText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput
          onChangeText={text => setUserInfo({...userInfo, name: text})}
          style={styles.nameInput}
          value={userInfo.name}
        />
      </View>
      {!isSame && (
        <View style={{marginTop: 20, paddingHorizontal: 12}}>
          <AppButton
            title="Update"
            onPress={handleSubmit}
            style={{borderRadius: 8}}
            isBusy={isBusy}
          />
        </View>
      )}
      {/* logout */}
      <View style={[styles.titleContainer, {marginTop: 36}]}>
        <Text style={styles.title}>Logout</Text>
      </View>
      <View style={styles.settingsOptions}>
        <Pressable onPress={() => handleLogout()} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
        <Pressable onPress={() => handleLogout(true)} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logoutText}>Logout from All</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    paddingBottom: 5,
    marginTop: 4,
  },
  title: {
    fontSize: 18,
    color: colors.SECONDARY,
    fontWeight: '700',
  },
  settingsOptions: {
    marginTop: 15,
    paddingLeft: 12,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  avatarUpdateText: {
    fontSize: 14,
    color: colors.SECONDARY,
    fontWeight: '500',
  },
  nameInput: {
    fontSize: 18,
    color: colors.CONTRAST,
    fontWeight: '500',
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.CONTRAST,
    borderRadius: 7,
    marginTop: 16,
    marginRight: 12,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 6,
    marginBottom: 16,
  },
  email: {
    fontSize: 18,
    color: colors.CONTRAST,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 6,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 14,
    color: colors.CONTRAST,
    fontWeight: '500',
  },
});

export default ProfileSettings;
