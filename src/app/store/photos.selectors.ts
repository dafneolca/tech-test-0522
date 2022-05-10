import { PhotoState } from './photos.reducers';
import { Photo } from './../models/photo.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from './photos.reducers';

export const photoFeatureSelector = createFeatureSelector<PhotoState>('photos');

export const getAllPhotos = createSelector(
  photoFeatureSelector,
  selectAll
);

export const arePhotosLoaded = createSelector(
  photoFeatureSelector,
  state => state.photosLoaded
);