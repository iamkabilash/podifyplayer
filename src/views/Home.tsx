import AudioOptionsModal from '@components/AudioOptionsModal';
import LatestUploads from '@components/LatestUploads';
import PlaylistForm, {PlaylistInfo} from '@components/PlaylistForm';
import PlaylistModal from '@components/PlaylistModal';
import RecommendedAudio from '@components/RecommendedAudio';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {AudiosData, Playlist} from 'src/@types/audio';
import catchAsyncError from 'src/api/catchError';
import {getClient} from 'src/api/client';
import {useFetchPlaylists} from 'src/hooks/query';
import {updateNotifocation} from 'src/store/notification';

interface Props {}

const Home: FC<Props> = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudiosData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

  const {data} = useFetchPlaylists();

  const dispatch = useDispatch();

  const handleLongPress = (audio: AudiosData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };

  const handleFavPress = async () => {
    if (!selectedAudio) return;

    try {
      const client = await getClient();
      const {data} = await client.post(
        '/favourite?audioId=' + selectedAudio.id,
      );
      dispatch(updateNotifocation({message: data.message, type: 'success'}));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotifocation({message: errorMessage, type: 'error'}));
    }
    setSelectedAudio(undefined);
    setShowOptions(false);
  };

  const handleAddToPlaylist = () => {
    // setSelectedAudio(audio); // already added to audio state, during longpress
    setShowOptions(false);
    setShowPlaylistModal(true);
  };

  const handlePlaylistSubmit = async (value: PlaylistInfo) => {
    if (!value.title.trim()) return;

    try {
      const client = await getClient();
      const {data} = await client.post('/playlist/create', {
        resId: selectedAudio?.id,
        title: value.title,
        visibility: value.private ? 'private' : 'public',
      });
      dispatch(
        updateNotifocation({
          message: `Playlist created: ${data.playlist.title}`,
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotifocation({message: errorMessage, type: 'error'}));
    }
  };

  const updatePlaylist = async (item: Playlist) => {
    try {
      const client = await getClient();
      const {data} = await client.patch('/playlist', {
        id: item.id,
        item: selectedAudio?.id,
        title: item.title,
        visibility: item.visibility,
      });
      dispatch(
        updateNotifocation({
          message: `Added to ${data.playlist.title}`,
          type: 'success',
        }),
      );
      setSelectedAudio(undefined);
      setShowPlaylistModal(false);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotifocation({message: errorMessage, type: 'error'}));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LatestUploads
          onAudioPress={item => console.log(item)}
          onAudioLongPress={handleLongPress}
        />
        <RecommendedAudio
          onAudioPress={item => console.log(item)}
          onAudioLongPress={handleLongPress}
        />
      </ScrollView>
      <AudioOptionsModal
        visible={showOptions}
        onRequestClose={() => setShowOptions(false)}
        options={[
          {
            title: 'Add to Playlist',
            icon: 'playlist-music',
            onPress: handleAddToPlaylist,
          },
          {
            title: 'Add to Favourite',
            icon: 'cards-heart',
            onPress: handleFavPress,
          },
        ]}
        renderItem={item => (
          <Pressable onPress={item.onPress} style={styles.modalOption}>
            <MaterialComIcon
              name={item.icon}
              color={colors.PRIMARY}
              size={18}
            />
            <Text style={styles.modalOptionText}>{item.title}</Text>
          </Pressable>
        )}
      />
      <PlaylistModal
        visible={showPlaylistModal}
        onRequestClose={() => {
          setShowPlaylistModal(false);
        }}
        playlist={data || []}
        handleCreateNew={() => {
          setShowPlaylistModal(false);
          setShowPlaylistForm(true);
        }}
        onPlaylistPress={updatePlaylist}
      />
      <PlaylistForm
        visible={showPlaylistForm}
        onRequestClose={() => {
          setShowPlaylistForm(false);
        }}
        onSubmit={handlePlaylistSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  modalOption: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 8,
  },
  modalOptionText: {
    color: colors.PRIMARY,
    fontSize: 16,
  },
});

export default Home;
