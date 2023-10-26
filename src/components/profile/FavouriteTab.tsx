import AudioListItem from '@ui/AudioListItem';
import AudioListLoadingUi from '@ui/AudioListLoadingUi';
import EmptyRecords from '@ui/EmptyRecords';
import {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useFetchFavouritesByProfile} from 'src/hooks/query';

interface Props {}

const FavouriteTab: FC<Props> = props => {
  const {data, isLoading} = useFetchFavouritesByProfile();

  if (isLoading) return <AudioListLoadingUi />;

  if (!data?.length) return <EmptyRecords title="No Favourites yet" />;

  return (
    <ScrollView style={styles.container}>
      {data?.map(item => (
        <AudioListItem audio={item} key={item.id} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: '100%',
  },
});

export default FavouriteTab;
