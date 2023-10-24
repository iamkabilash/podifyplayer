import Avatar from '@ui/Avatar';
import colors from '@utils/colors';
import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {UserProfile} from 'src/store/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';

interface Props {
  profile?: UserProfile | null;
}

const ProfileContainer: FC<Props> = ({profile}) => {
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  if (!profile) return null;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Pressable onPress={() => navigate('ProfileSettings')}>
          <Avatar source={profile.avatar} />
        </Pressable>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
        </View>
      </View>
      <View style={styles.followContainer}>
        <Text style={styles.follow}>{profile.followers} followers</Text>
        <Text style={styles.follow}>{profile.followings} following</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  profileName: {
    color: colors.CONTRAST,
    fontSize: 14,
    fontWeight: '600',
  },
  followContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  follow: {
    backgroundColor: colors.SECONDARY,
    color: colors.PRIMARY,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
});

export default ProfileContainer;
