import colors from '@utils/colors';
import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';

interface Props {
  title: string;
  poster?: string;
}

const AudioCard: FC<Props> = ({title, poster}) => {
  const source = poster ? {uri: poster} : require('../assets/music.png');

  return (
    <Pressable
      onPress={() => {}}
      onLongPress={() => {}}
      style={styles.audioContainer}>
      <Image source={source} style={styles.audioPoster} />
      <Text style={styles.audioText} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  audioContainer: {
    width: 100,
    marginRight: 12,
  },
  audioPoster: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 7,
  },
  audioText: {
    color: colors.CONTRAST,
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 5,
  },
});

export default AudioCard;
