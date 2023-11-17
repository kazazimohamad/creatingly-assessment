import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(page: number, limit: number): Observable<Post[]> {
    const params = {
      _page: page.toString(),
      _limit: limit.toString()
    };
    return this.http.get<Post[]>(this.apiUrl, { params }).pipe(
      map((posts: any[]) => {
        return posts.map((post: any) => {
          return {
            id: post.id,
            userId: post.userId,
            title: post.title,
            body: post.body,
            createdDate: new Date(),
            author: 'Test Author' // Replace with actual author
          };
        });
      })
    );
  }
}
