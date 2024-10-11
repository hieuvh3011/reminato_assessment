import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Movie from '@app/entities/movie';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@app/theme/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  BOOKING_SCREEN,
  RootStackParamList,
} from '@app/navigation/main_navigation';
import {useAppDispatch} from '@app/redux/store';
import {selectMovie} from '@app/redux/movie/movie_slice';

interface ItemMovieProps {
  movie: Movie;
  onPressLike: () => void;
}

const ItemMovie = ({movie, onPressLike}: ItemMovieProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const onPressBook = () => {
    dispatch(selectMovie(movie));
    navigation.navigate(BOOKING_SCREEN);
  };

  const renderBookIcon = () => {
    if (movie.isBooked) {
      return (
        <View style={styles.button}>
          <Icon name="check" size={30} color={colors.status.success} />
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.button} onPress={onPressBook}>
        <Icon name="book" size={30} color={colors.button.booked} />
      </TouchableOpacity>
    );
  };

  const renderLikeIcon = () => {
    if (movie.isLiked) {
      return <Icon name="heart" size={30} color={colors.button.favorite} />;
    }
    return (
      <Icon name="heart-outline" size={30} color={colors.button.favorite} />
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: movie.thumbnail}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {movie.description}
        </Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity style={styles.button} onPress={onPressLike}>
          {renderLikeIcon()}
        </TouchableOpacity>
        {renderBookIcon()}
      </View>
    </View>
  );
};

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
  },
  description: {
    fontSize: 14,
    marginTop: 4,
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
