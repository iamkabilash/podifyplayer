import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Playlist} from 'src/@types/audio';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  playlist: Playlist;
  onPress?(): void;
}

const PlaylistItem: FC<Props> = ({playlist, onPress}) => {
  const {id, itemsCount, title, visibility} = playlist;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.posterContainer}>
        <MaterialComIcons
          name="playlist-music"
          size={30}
          color={colors.CONTRAST}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <View style={styles.countContainer}>
          <FontAwesome
            name={visibility === 'public' ? 'globe' : 'lock'}
            color={colors.CONTRAST}
          />
          <Text style={styles.countText}>
            {itemsCount} {itemsCount > 1 ? 'audios' : 'audio'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  posterContainer: {
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 6,
    height: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.SECONDARY,
    fontWeight: '700',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  countText: {
    fontSize: 14,
    color: colors.CONTRAST,
  },
});

export default PlaylistItem;
