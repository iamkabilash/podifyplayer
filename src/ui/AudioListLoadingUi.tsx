import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import PulseAnimationContainer from './PulseAnimationContainer';
import colors from '@utils/colors';

interface Props {
  items?: number;
}

const AudioListLoadingUi: FC<Props> = ({items = 8}) => {
  const dummyData = new Array(items).fill('');

  return (
    <PulseAnimationContainer>
      <View style={styles.container}>
        {dummyData.map((_, index) => (
          <View key={index} style={styles.dummyListItem} />
        ))}
      </View>
    </PulseAnimationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  dummyListItem: {
    height: 50,
    width: '100%',
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 5,
    marginBottom: 12,
  },
});

export default AudioListLoadingUi;
