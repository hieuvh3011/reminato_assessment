import {useAppDispatch, useAppSelector} from '@app/redux/store';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from '@app/presentation/common/header';
import colors from '@app/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {bookMovie} from '@app/redux/movie/movie_slice';

const BookingScreen = () => {
  const movie = useAppSelector(state => state.movie.selectedMovie);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPressBookNow = () => {
    dispatch(bookMovie(movie?.id ?? -1));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title={'Booking'} />
      <View style={styles.content}>
        <Image source={{uri: movie?.thumbnail}} style={styles.poster} />
        <View style={styles.info}>
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.description}>{movie?.description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={onPressBookNow}>
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  poster: {
    width: '100%',
    height: 300,
  },
  info: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.background,
  },
});

export default BookingScreen;
