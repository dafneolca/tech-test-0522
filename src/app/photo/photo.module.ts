import { PhotosEffects } from '../store/photos.effects';
import { GeneralService } from '../services/general.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { photosReducer } from '../store/Photos.reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('photos', photosReducer),
    EffectsModule.forFeature([PhotosEffects])
  ],
  providers: [GeneralService],
  bootstrap: []
})
export class PhotoModule { }