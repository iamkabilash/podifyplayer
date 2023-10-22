import ModalContainer from '@ui/ModalContainer';
import {FC, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  visible?: boolean;
  onRequestClose(): void;
  options: any[];
  renderItem(item: any): JSX.Element;
}

const AudioOptionsModal: FC<Props> = ({
  visible = false,
  onRequestClose,
  options,
  renderItem,
}) => {
  return (
    <ModalContainer visible={visible} onRequestClose={onRequestClose}>
      {options.map((item, index) => (
        <View key={index}>{renderItem(item)}</View>
      ))}
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AudioOptionsModal;
