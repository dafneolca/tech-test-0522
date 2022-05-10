import { Photo } from '../models/photo.model';
import { createAction, props } from '@ngrx/store';


export const loadPhotos = createAction(
  '[Photos List] Load Photos via Service',
);

export const photosLoaded = createAction(
  '[Photos Effect] Photos Loaded Successfully',
  props<{photos: Photo[]}>()
);

export const photosActionTypes = {
  loadPhotos,
  photosLoaded
};