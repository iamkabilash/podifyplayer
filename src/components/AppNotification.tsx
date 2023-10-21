import colors from '@utils/colors';
import {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {getNotificationState, updateNotifocation} from 'src/store/notification';

interface Props {}

const AppNotification: FC<Props> = props => {
  const {message, type} = useSelector(getNotificationState);
  const dispatch = useDispatch();

  const height = useSharedValue(0);
  const heightStyle = useAnimatedStyle(() => {
    return {height: height.value};
  });

  let backgroundColor;
  let textColor;

  switch (type) {
    case 'success':
      backgroundColor = colors.SUCCESS;
      textColor = colors.PRIMARY;
      break;
    case 'error':
      backgroundColor = colors.ERROR;
      textColor = colors.CONTRAST;
      break;
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const notificationAnimation = () => {
      height.value = withTiming(45, {duration: 150});

      timeoutId = setTimeout(() => {
        height.value = withTiming(0, {duration: 150});

        dispatch(updateNotifocation({message: '', type: null}));
      }, 3000);
    };

    if (message) notificationAnimation();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: backgroundColor},
        heightStyle,
      ]}>
      <Text style={[styles.message, {color: textColor}]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    alignItems: 'center',
  },
});

export default AppNotification;
