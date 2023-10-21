import GridView from '@ui/GridView';
import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useFetchRecommendedAudios} from 'src/hooks/query';

interface Props {}

const dummyData = new Array(6).fill('');

const RecommendedAudio: FC<Props> = props => {
  const {data, isLoading} = useFetchRecommendedAudios();

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
      <Text style={styles.title}>Recommended Songs</Text>
      <GridView data={data || []} column={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 12,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  loadingTitle: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginVertical: 15,
    borderRadius: 5,
  },
  loadingAudioContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  loadingPoster: {
    height: 106,
    width: 106,
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 7,
  },
});

export default RecommendedAudio;
