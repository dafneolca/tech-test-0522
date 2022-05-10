import { Photo } from '../models/photo.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { photosActionTypes, photosLoaded } from './photos.actions';

export interface PhotoState extends EntityState<Photo> {
  photosLoaded: boolean;
}

export const adapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState = adapter.getInitialState({
  photosLoaded: false
});

export const photosReducer = createReducer(
  initialState,

  on(photosActionTypes.photosLoaded, (state, action) => {
    return adapter.setAll(
      action.photos,
      {...state, photosLoaded: true}
    );
  }),

);

export const { selectAll } = adapter.getSelectors();