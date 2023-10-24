import PlaylistItem from '@ui/PlaylistItem';
import {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchPlaylists} from 'src/hooks/query';

interface Props {}

const PlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchPlaylists();

  return (
    <ScrollView style={styles.container}>
      {data?.map(playlist => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'column',
    gap: 12,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
});

export default PlaylistTab;
