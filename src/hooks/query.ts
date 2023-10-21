import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {AudiosData} from 'src/@types/audio';
import catchAsyncError from 'src/api/catchError';
import client from 'src/api/client';
import {updateNotifocation} from 'src/store/notification';

// fetch latest
const fetchLatest = async (): Promise<AudiosData[]> => {
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
