import ProfileContainer from '@components/ProfileContainer';
import FavouriteTab from '@components/profile/FavouriteTab';
import HistoryTab from '@components/profile/HistoryTab';
import PlaylistTab from '@components/profile/PlaylistTab';
import UploadsTab from '@components/profile/UploadsTab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getAuthState} from 'src/store/auth';

const Tab = createMaterialTopTabNavigator();

interface Props {}

const Profile: FC<Props> = props => {
  const {profile} = useSelector(getAuthState);

  return (
    <View style={styles.container}>
      <ProfileContainer profile={profile} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabel,
        }}>
        <Tab.Screen name="Uploads" component={UploadsTab} />
        <Tab.Screen name="Playlists" component={PlaylistTab} />
        <Tab.Screen name="Favourites" component={FavouriteTab} />
        <Tab.Screen name="History" component={HistoryTab} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowRadius: 0,
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.CONTRAST,
  },
});

export default Profile;
