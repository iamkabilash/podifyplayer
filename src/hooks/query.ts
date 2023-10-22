import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {AudiosData, Playlist} from 'src/@types/audio';
import catchAsyncError from 'src/api/catchError';
import {getClient} from 'src/api/client';
import {updateNotifocation} from 'src/store/notification';

// fetch latest
const fetchLatest = async (): Promise<AudiosData[]> => {
  const client = await getClient();
  const {data} = await client.get('/audio/latest');
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();

  const query = useQuery(['latest-uploads'], {
    queryFn: () => fetchLatest(),
    onError: err => {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotifocation({type: 'error', message: errorMessage}));
    },
  });

  return query;
};

// fetch recommended
const fetchRecommended = async (): Promise<AudiosData[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/recommended');
  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  const dispatch = useDispatch();

  const query = useQuery(['recommended'], {
    queryFn: () => fetchRecommended(),
    onError: err => {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotifocation({type: 'error', message: errorMessage}));
    },
  });

  return query;
};

// fetch playlist
const fetchPlaylists = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client.get('/playlist/by-profile');
  return data.playlists;
};

export const useFetchPlaylists = () => {
  const dispatch = useDispatch();

  const query = useQuery(['by-profile'], {
    queryFn: () => fetchPlaylists(),
    onError: err => {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotifocation({type: 'error', message: errorMessage}));
    },
  });

  return query;
};
