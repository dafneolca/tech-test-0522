import { photosActionTypes, photosLoaded } from './photos.actions';
import { GeneralService } from './../services/general.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PhotosEffects {

  // loadCourses$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(courseActionTypes.loadCourses),
  //     concatMap(() => this.courseService.getAllCourses()),
  //     map(courses => courseActionTypes.coursesLoaded({courses}))
  //   )
  // );

  loadPhotos$ = createEffect(() => 
    this.actions$.pipe(
      ofType(photosActionTypes.loadPhotos),
      concatMap(()=> this.generalService.getPhotos()),
      map(photos => photosActionTypes.photosLoaded({photos}))
    ))


  constructor(private generalService: GeneralService, private actions$: Actions, private router: Router) {}
}