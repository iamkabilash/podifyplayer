import colors from '@utils/colors';
import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  data: any[];
  column?: number;
}

const GridView: FC<Props> = ({data, column = 2}) => {
  const getPoster = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music.png');
  };

  return (
    <View style={styles.container}>
      {data?.map(item => (
        <View style={{width: `${100 / column}%`}}>
          <View style={{padding: 6}}>
            <Pressable>
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
