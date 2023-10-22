import ModalContainer from '@ui/ModalContainer';
import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Playlist} from 'src/@types/audio';

interface Props {
  visible: boolean;
  onRequestClose(): void;
  playlist: Playlist[];
  handleCreateNew(): void;
  onPlaylistPress(item: Playlist): void;
}

interface ListItemProps {
  title: string;
  icon: ReactNode;
  onPress?(): void;
}

const ListItem: FC<ListItemProps> = ({title, icon, onPress}) => {
  return (
    <Pressable style={styles.listItemContainer} onPress={onPress}>
      {icon}
      <Text style={styles.listItemText}>{title}</Text>
    </Pressable>
  );
};

const PlaylistModal: FC<Props> = ({
  visible,
  onRequestClose,
  playlist,
  handleCreateNew,
  onPlaylistPress,
}) => {
  return (
    <ModalContainer visible={visible} onRequestClose={onRequestClose}>
      <ScrollView>
        {playlist?.map(item => (
          <ListItem
            key={item.id}
            onPress={() => onPlaylistPress(item)}
            title={item.title}
            icon={
              <FontAwesomeIcon
                name={item.visibility === 'public' ? 'globe' : 'lock'}
                size={18}
                color={colors.PRIMARY}
              />
            }
          />
        ))}

        <ListItem
          title="Create New"
          icon={<AntDesign name="plus" size={18} color={colors.PRIMARY} />}
          onPress={handleCreateNew}
        />
      </ScrollView>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    gap: 10,
  },
  listItemText: {fontSize: 16, color: colors.PRIMARY},
});

export default PlaylistModal;
