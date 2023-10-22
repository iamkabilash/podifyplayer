import ModalContainer from '@ui/ModalContainer';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface PlaylistInfo {
  title: string;
  private: boolean;
}

interface Props {
  visible: boolean;
  onRequestClose(): void;
  onSubmit(value: PlaylistInfo): void;
}

const PlaylistForm: FC<Props> = ({visible, onRequestClose, onSubmit}) => {
  const [playlistInfo, setPlaylistInfo] = useState({title: '', private: false});

  const handleSubmit = () => {
    onSubmit(playlistInfo);
    handleClose();
  };
  const handleClose = () => {
    setPlaylistInfo({title: '', private: false});
    onRequestClose();
  };

  return (
    <ModalContainer visible={visible} onRequestClose={handleClose}>
      <View>
        <Text style={styles.title}>Create New Playlist</Text>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={text => setPlaylistInfo({...playlistInfo, title: text})}
          value={playlistInfo.title}
        />
        <Pressable
          style={styles.privateSelector}
          onPress={() =>
            setPlaylistInfo({...playlistInfo, private: !playlistInfo.private})
          }>
          {playlistInfo.private ? (
            <MaterialComIcon name="radiobox-marked" color={colors.PRIMARY} />
          ) : (
            <MaterialComIcon name="radiobox-blank" color={colors.PRIMARY} />
          )}

          <Text style={styles.privateLabel}>Private</Text>
        </Pressable>
        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text>Create</Text>
        </Pressable>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: '700',
    padding: 10,
  },
  input: {
    height: 45,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    color: colors.PRIMARY,
  },
  privateSelector: {
    height: 45,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  privateLabel: {
    color: colors.PRIMARY,
  },
  submitBtn: {
    margin: 10,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    borderRadius: 7,
  },
});

export default PlaylistForm;
