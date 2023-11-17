import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class MockPostService {

  constructor() { }

  getMockPosts(): Observable<Post[]> {
    const mockPosts: Post[] = [];
    const numberOfPosts = 1000; // Define the number of mock posts you want

    for (let i = 1; i <= numberOfPosts; i++) {
      const mockPost: Post = {
        id: i,
        userId: Math.floor(Math.random() * 10) + 1, // Random userId between 1 and 10
        title: `Mock Post ${i}`,
        body: `This is the body of mock post ${i}`,
        createdDate: new Date(), // Set the created date to the current date
        author: `Mock Author ${i}` // Assign a mock author name
        // Add any other properties you need for the mock post
      };
      mockPosts.push(mockPost);
    }

    return of(mockPosts);
  }
}
