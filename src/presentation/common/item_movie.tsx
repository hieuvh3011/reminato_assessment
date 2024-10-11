import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Movie from '@app/entities/movie';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@app/theme/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  BOOKING_SCREEN,
  RootStackParamList,
} from '@app/navigation/main_navigation';
import {useAppDispatch} from '@app/redux/store';
import {
  likeMovie,
  selectMovie,
  unlikeMovie,
} from '@app/redux/movie/movie_slice';

interface ItemMovieProps {
  movie: Movie;
}

const ItemMovie = React.memo(({movie}: ItemMovieProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [isLiked, setIsLiked] = useState<boolean>(movie.isLiked);
  const likeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLikeToggle = () => {
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);

    // remove existing timeout
    if (likeTimeoutRef.current) {
      clearTimeout(likeTimeoutRef.current);
    }

    // debounce the dispatch with 300ms
    likeTimeoutRef.current = setTimeout(() => {
      if (newLikedStatus) {
        dispatch(likeMovie(movie.id));
      } else {
        dispatch(unlikeMovie(movie.id));
      }
      likeTimeoutRef.current = null;
    }, 300);
  };

  const onPressBook = () => {
    dispatch(selectMovie(movie));
    navigation.navigate(BOOKING_SCREEN);
  };

  const renderBookIcon = () => {
    if (movie.isBooked) {
      return <Icon name="check" size={30} color={colors.status.success} />;
    }
    return <Icon name="book" size={30} color={colors.button.booked} />;
  };

  const renderLikeIcon = () => {
    if (isLiked) {
      return <Icon name={'heart'} size={30} color={colors.button.favorite} />;
    }
    return (
      <Icon name={'heart-outline'} size={30} color={colors.button.favorite} />
    );
  };

  return (
    <Pressable style={styles.container} onPress={onPressBook}>
      <Image source={{uri: movie.thumbnail}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {movie.description}
        </Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLikeToggle}
          hitSlop={10}>
          {renderLikeIcon()}
        </TouchableOpacity>
        <View style={styles.button}>{renderBookIcon()}</View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.itemMovieBackground,
    paddingHorizontal: 8,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: colors.textSecondary,
  },
  info: {
    flex: 1,
    paddingHorizontal: 8,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 4,
  },
});

export default ItemMovie;
