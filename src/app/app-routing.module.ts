import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from './pages/posts/posts.component';
import {HomeComponent} from './pages/home/home.component';
import {PostsAutoDeleteComponent} from './pages/posts-auto-delete/posts-auto-delete.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
  path: 'posts',
  component: PostsComponent
  },
  {
    path: 'posts-auto-delete',
    component: PostsAutoDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
