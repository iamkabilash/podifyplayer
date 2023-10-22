import colors from '@utils/colors';
import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AudiosData} from 'src/@types/audio';

interface Props {
  data: any[];
  column?: number;
  onAudioPress(item: AudiosData, data: AudiosData[]): void;
  onAudioLongPress(item: AudiosData, data: AudiosData[]): void;
}

const GridView: FC<Props> = ({
  data,
  column = 2,
  onAudioPress,
  onAudioLongPress,
}) => {
  const getPoster = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music.png');
  };

  return (
    <View style={styles.container}>
      {data?.map(item => (
        <View key={item.id} style={{width: `${100 / column}%`}}>
          <View style={{padding: 6}}>
            <Pressable
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}>
              <Image
                source={getPoster(item.poster)}
                style={styles.posterImage}
              />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.audioText}>
                {item.title}
              </Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', flexDirection: 'row', flexWrap: 'wrap'},
  posterImage: {width: '100%', aspectRatio: 1, borderRadius: 7},
  audioText: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
});

export default GridView;
