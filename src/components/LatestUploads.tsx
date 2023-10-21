import AudioCard from '@ui/AudioCard';
import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import colors from '@utils/colors';
import {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchLatestAudios} from 'src/hooks/query';

interface Props {}

const dummyData = new Array(4).fill('');

const LatestUploads: FC<Props> = props => {
  const {data, isLoading} = useFetchLatestAudios();

  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.loadingTitle} />
          <View style={styles.loadingAudioContainer}>
            {dummyData.map((_, index) => (
              <View key={index} style={styles.loadingPoster}></View>
            ))}
          </View>
        </View>
      </PulseAnimationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploads</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map(item => (
          <AudioCard key={item.id} title={item.title} poster={item.poster} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  title: {
    marginVertical: 15,
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingTitle: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginVertical: 15,
    borderRadius: 5,
  },
  loadingAudioContainer: {
    flexDirection: 'row',
  },
  loadingPoster: {
    height: 100,
    width: 100,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginRight: 12,
    borderRadius: 7,
  },
});

export default LatestUploads;
