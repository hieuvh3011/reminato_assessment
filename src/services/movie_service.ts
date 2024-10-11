import Realm from 'realm';
import {MOVIE_SCHEMA, MovieSchema} from '@app/database/movie_schema';
import Movie from '@app/entities/movie';
import mockData from '../../assets/mock_data.json';

let realmInstance: Realm | null = null;


export const getRealm = async (): Promise<Realm> => {
  if (!realmInstance || realmInstance.isClosed) {
    realmInstance = await Realm.open({
      schema: [MovieSchema.schema],
      schemaVersion: 1,
    });
  }
  return realmInstance;
};

export const closeRealm = () => {
  if (realmInstance && !realmInstance.isClosed) {
    realmInstance.close();
    realmInstance = null;
  }
};

export const initializeMockData = async () => {
  const realm = await getRealm();

  const existingMovies = realm.objects<Movie>(MOVIE_SCHEMA);
  if (existingMovies.length > 0) {
    return;
  }

  realm.write(() => {
    mockData.forEach((movie: Movie) => {
      realm.create(MOVIE_SCHEMA, movie);
    });
  });
};

export const addMovie = async (movie: Movie) => {
  const realm = await getRealm();
  realm.write(() => {
    realm.create(MOVIE_SCHEMA, movie);
  });
};

export const getAllMovies = async (): Promise<Movie[]> => {
  const realm = await getRealm();
  const rawMovies = realm.objects<Movie>(MOVIE_SCHEMA);
  const result: Movie[] = [];
  rawMovies.forEach(movie => {
    result.push({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      thumbnail: movie.thumbnail,
      isLiked: movie.isLiked,
      isBooked: movie.isBooked,
    });
  });
  return result;
};

export const updateMovieLike = async (movieId: number, isLiked: boolean) => {
  const realm = await getRealm();
  realm.write(() => {
    const movie = realm.objectForPrimaryKey<Movie>(MOVIE_SCHEMA, movieId);
    if (movie) {
      movie.isLiked = isLiked;
    }
  });
};

export const updateMovie = async (
  movieId: number,
  updateData: Partial<Movie>,
) => {
  const realm = await getRealm();
  realm.write(() => {
    let movie = realm.objectForPrimaryKey<Movie>(MOVIE_SCHEMA, movieId);
    if (movie) {
      Object.keys(updateData).forEach(key => {
        const field = key as keyof Movie;
        (movie[field] as any) = updateData[field];
      });
    } else {
      console.warn(`Movie with id ${movieId} not found.`);
    }
  });

  return getAllMovies();
};

export const deleteMovie = async (movieId: number) => {
  const realm = await getRealm();
  realm.write(() => {
    const movie = realm.objectForPrimaryKey<Movie>(MOVIE_SCHEMA, movieId);
    if (movie) {
      realm.delete(movie);
    }
  });
};
