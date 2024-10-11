import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import ItemMovie from '@app/presentation/common/item_movie';
import colors from '@app/theme/colors';
import {fetchMovies} from '@app/redux/movie/movie_slice';
import {useAppDispatch, useAppSelector} from '@app/redux/store';
import Movie from '@app/entities/movie';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(state => state.movie.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.text}>No movies found</Text>
      </View>
    );
  };

  const renderItem = ({item}: {item: Movie}) => {
    return <ItemMovie movie={item} />;
  };

  const renderFlatList = () => {
    if (movies.length === 0) {
      return renderEmptyList();
    }
    return (
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={item => item.id.toString()}
        data={movies}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        initialNumToRender={30}
        maxToRenderPerBatch={50}
        windowSize={10}
        ItemSeparatorComponent={renderSeparator}
      />
    );
  };

  return <View style={styles.container}>{renderFlatList()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  separator: {
    height: 0.6,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatListContainer: {
    paddingVertical: 8,
    // flex: 1,
  },
});

export default HomeScreen;
