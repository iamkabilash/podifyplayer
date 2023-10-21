import LatestUploads from '@components/LatestUploads';
import RecommendedAudio from '@components/RecommendedAudio';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {}

const Home: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <LatestUploads />
      <RecommendedAudio />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});

export default Home;
