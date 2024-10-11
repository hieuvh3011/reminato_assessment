import Realm from 'realm';
import Movie from '@app/entities/movie';

export const MOVIE_SCHEMA = 'movie_schema';

export class MovieSchema extends Realm.Object<Movie> implements Movie {
  id!: number;
  title!: string;
  description!: string;
  thumbnail!: string;
  isLiked!: boolean;
  isBooked!: boolean;

  static schema: Realm.ObjectSchema = {
    name: MOVIE_SCHEMA,
    primaryKey: 'id',
    properties: {
      id: 'int',
      title: 'string',
      description: 'string',
      thumbnail: 'string',
      isLiked: 'bool',
      isBooked: 'bool',
    },
  };
}
