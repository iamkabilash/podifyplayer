import CategorySelector from '@components/CategorySelector';
import FileSelector from '@components/FileSelector';
import AppButton from '@ui/AppButton';
import Progress from '@ui/Progress';
import {categories} from '@utils/audioCategories';
import colors from '@utils/colors';
import {mapRange} from '@utils/math';
import {FC, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {DocumentPickerResponse, types} from 'react-native-document-picker';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import catchAsyncError from 'src/api/catchError';
import {getClient} from 'src/api/client';
import {updateNotifocation} from 'src/store/notification';
import * as yup from 'yup';

interface Props {}

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

const defaultForm: FormFields = {
  title: '',
  category: '',
  about: '',
  file: undefined,
  poster: undefined,
};

const audioValidationSchema = yup.object().shape({
  title: yup.string().trim().required('Title is required'),
  category: yup.string().oneOf(categories, 'Category is required'),
  about: yup.string().trim().required('About is required'),
  file: yup.object().shape({
    uri: yup.string().required('Audio file is missing'),
    name: yup.string().required('Audio file is missing'),
    type: yup.string().required('Audio file is missing'),
    size: yup.number().required('Audio file is missing'),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});

const Upload: FC<Props> = props => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({...defaultForm});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isBusy, setIsBusy] = useState(false);

  const dispatch = useDispatch();

  const handleUpload = async () => {
    // console.log(audioInfo);
    setIsBusy(true);
    try {
      const bodyData = await audioValidationSchema.validate(audioInfo);
      // console.log(data);

      const formData = new FormData();
      formData.append('title', bodyData.title);
      formData.append('category', bodyData.category);
      formData.append('about', bodyData.about);
      formData.append('file', {
        name: bodyData.file.name,
        type: bodyData.file.type,
        uri: bodyData.file.uri,
      });
      if (bodyData.poster.uri) {
        formData.append('poster', {
          name: bodyData.poster.name,
          type: bodyData.poster.type,
          uri: bodyData.poster.uri,
        });
      }

      const client = await getClient({'Content-Type': 'multipart/form-data'});
      const {data} = await client.post('/audio/create', formData, {
        onUploadProgress(progressEvent) {
          const uploaded = mapRange({
            inputMin: 0,
            inputMax: progressEvent.total || 0,
            outputMin: 0,
            outputMax: 100,
            inputValue: progressEvent.loaded,
          });
          setUploadProgress(Math.floor(uploadProgress));
        },
      });
      setAudioInfo({...defaultForm});
      setIsBusy(false);
      dispatch(
        updateNotifocation({message: 'Audio uploaded', type: 'success'}),
      );
      // console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotifocation({message: errorMessage, type: 'error'}));
    }
    setIsBusy(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fileSelectContainer}>
        <FileSelector
          icon={
            <MaterialComIcon
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
          options={{type: types.images}}
          onSelect={file => setAudioInfo({...audioInfo, poster: file})}
        />
        <FileSelector
          icon={
            <MaterialComIcon
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          options={{type: types.audio}}
          onSelect={file => setAudioInfo({...audioInfo, file: file})}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
          onChangeText={text => setAudioInfo({...audioInfo, title: text})}
          value={audioInfo.title}
        />
        <Pressable
          onPress={() => setShowCategoryModal(true)}
          style={styles.categorySelector}>
          <Text style={styles.catTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>
        <TextInput
          placeholder="About"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
          onChangeText={text => setAudioInfo({...audioInfo, about: text})}
          value={audioInfo.about}
        />
        <CategorySelector
          data={categories}
          visible={showCategoryModal}
          title="Category"
          onSelect={item => setAudioInfo({...audioInfo, category: item})}
          onRequestClose={() => setShowCategoryModal(false)}
        />
      </View>
      <View style={{marginBottom: 20}}>
        {isBusy ? <Progress progress={uploadProgress} /> : null}
      </View>
      <AppButton
        title="Submit"
        isBusy={isBusy}
        onPress={handleUpload}
        style={{borderRadius: 7}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  fileSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    marginBottom: 20,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  catTitle: {
    color: colors.CONTRAST,
    fontSize: 16,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontSize: 16,
  },
});

export default Upload;
