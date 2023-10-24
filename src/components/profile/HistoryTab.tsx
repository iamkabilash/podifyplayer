import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const HistoryTab: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HistoryTab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 16,
    color: 'white',
  },
});

export default HistoryTab;
