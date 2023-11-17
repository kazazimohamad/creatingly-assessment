import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsAutoDeleteComponent } from './posts-auto-delete.component';

describe('PostsAutoDeleteComponent', () => {
  let component: PostsAutoDeleteComponent;
  let fixture: ComponentFixture<PostsAutoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsAutoDeleteComponent]
    });
    fixture = TestBed.createComponent(PostsAutoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
