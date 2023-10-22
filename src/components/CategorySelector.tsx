import ModalContainer from '@ui/ModalContainer';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
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
    <ModalContainer visible={visible} onRequestClose={onRequestClose}>
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
              <MaterialComIcon name="radiobox-blank" color={colors.SECONDARY} />
            )}
            <Text style={{padding: 10, color: colors.PRIMARY}}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
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
