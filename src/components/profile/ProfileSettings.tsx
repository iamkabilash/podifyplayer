import AppHeader from '@components/AppHeader';
import Avatar from '@ui/Avatar';
import colors from '@utils/colors';
import {FC} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '@ui/AppButton';
import {getClient} from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {useDispatch} from 'react-redux';
import {updateNotifocation} from 'src/store/notification';
import {Keys, removeFromAsyncStorage} from '@utils/asyncStorage';
import {
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from 'src/store/auth';

interface Props {}

const ProfileSettings: FC<Props> = props => {
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

  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.settingsOptions}>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>Hey</Text>
          <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
        </View>
        <View style={styles.avatarContainer}>
          <Avatar />
          <Pressable>
            <Text style={styles.avatarUpdateText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput style={styles.nameInput} />
      </View>
      <View style={{marginTop: 20, paddingHorizontal: 12}}>
        <AppButton title="Update" style={{borderRadius: 8}} />
      </View>
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
