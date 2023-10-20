import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {SupportedPlatforms} from 'react-native-document-picker/lib/typescript/fileTypes';

interface Props {
  icon: ReactNode;
  btnTitle?: string;
  style?: StyleProp<ViewStyle>;
  onSelect(file: DocumentPickerResponse): void;
  options: DocumentPickerOptions<SupportedPlatforms>;
}

const FileSelector: FC<Props> = ({
  icon,
  btnTitle,
  style,
  options,
  onSelect,
}) => {
  const handleDocumentSelect = async () => {
    try {
      const document = await DocumentPicker.pick(options);
      // example document response
      // [
      //   {
      //     fileCopyUri: null,
      //     name: 'Song name',
      //     size: 186021,
      //     type: 'image/png',
      //     uri: 'file:///Users/iamkabilash/Library/Developer/CoreSimulator/Devices/DD658036-2B99-42DA-A17D-ED3B8565239C/data/Containers/Data/Application/1B47ED95-BF33-4E0B-88EB-936F1DBC84BC/tmp/org.reactjs.native.example.podifyplayer-Inbox/image_processing20191105-12900-14yhz47-C5C0EDCD-74ED-4EC0-A47D-6F23414A976C.PNG',
      //   },
      // ];

      const file = document[0];
      onSelect(file);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log('Document pick error: ', error);
      }
    }
  };

  return (
    <Pressable
      onPress={handleDocumentSelect}
      style={[styles.btnContainer, style]}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.btnTitle}>{btnTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: colors.CONTRAST,
    marginTop: 5,
  },
});

export default FileSelector;
