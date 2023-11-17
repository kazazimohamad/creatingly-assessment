import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './pages/home/home.component';
import {PostsComponent} from './pages/posts/posts.component';
import {TrackVisibilityDirective} from './shared/directives/inView.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PostsAutoDeleteComponent } from './pages/posts-auto-delete/posts-auto-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    TrackVisibilityDirective,
    PostsAutoDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
