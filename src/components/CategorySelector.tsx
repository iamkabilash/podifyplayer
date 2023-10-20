import colors from '@utils/colors';
import {FC, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  data: any[];
  visible?: boolean;
  title?: string;
  onSelect(item: string, index: number): void;
  onRequestClose(): void;
}

const CategorySelector: FC<Props> = ({
  data,
  visible = false,
  title,
  onSelect,
  onRequestClose,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelectCategory = (item: string, index: number) => {
    setSelectedIndex(index);
    onSelect(item, index);
    onRequestClose();
  };

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <Pressable onPress={onRequestClose} style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView>
              {data.map((item, index) => (
                <Pressable
                  onPress={() => handleSelectCategory(item, index)}
                  key={index}
                  style={styles.selectorContainer}>
                  {selectedIndex === index ? (
                    <MaterialComIcon
                      name="radiobox-marked"
                      color={colors.SECONDARY}
                    />
                  ) : (
                    <MaterialComIcon
                      name="radiobox-blank"
                      color={colors.SECONDARY}
                    />
                  )}
                  <Text style={{padding: 10, color: colors.PRIMARY}}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.CONTRAST,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategorySelector;
