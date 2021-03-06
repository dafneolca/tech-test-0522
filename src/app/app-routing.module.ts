import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { PhotosComponent } from './pages/photos/photos.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full'}, 
  { path: 'posts', component: PostsComponent },
  { path: 'photos', component: PhotosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }