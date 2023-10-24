import colors from '@utils/colors';
import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AudiosData} from 'src/@types/audio';

interface Props {
  audio: AudiosData;
  onPress?(): void;
}

const AudioListItem: FC<Props> = ({audio, onPress}) => {
  const getSource = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music.png');
  };

  return (
    <Pressable onPress={onPress} style={styles.audioItem}>
      <Image source={getSource(audio.poster)} style={styles.poster} />
      <View style={styles.audioInfoContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {audio.title}
        </Text>
        <Text style={styles.ownerName} numberOfLines={1} ellipsizeMode="tail">
          {audio.owner.name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  audioItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000001f',
    marginBottom: 12,
    borderRadius: 5,
    gap: 10,
  },
  poster: {
    width: 50,
    height: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  audioInfoContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  title: {
    color: colors.SECONDARY,
    fontWeight: '700',
  },
  ownerName: {
    color: colors.CONTRAST,
    fontWeight: '700',
  },
});

export default AudioListItem;
