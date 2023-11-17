import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {Post} from '../../shared/models/post';
import {PostService} from '../../shared/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  posts: Post[] = [];
  page = 1;
  limit = 20;
  loadNextPageOnIndex = 15;
  removeViewedItemsAfterSecond = 0;
  removeItemsInterval: any;
  loading: boolean = false;
  isLastPage = false;

  @ViewChild('postList') postList!: ElementRef;

  constructor(
    private postService: PostService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  loadNextPageHandler(): void {
    if (this.loading || this.isLastPage) return;
    this.page++;
    console.log('Fetch next page data' , this.page);
    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.loading = true;
    this.postService.getPosts(this.page, this.limit).subscribe((newPosts: Post[]) => {
      if(newPosts.length < this.limit) {
        this.isLastPage = true;
      }
      this.posts = this.posts.concat(newPosts);
      this.loading = false;
    });
  }

  itemViewed(itemIndex: any) {
    if(!this.removeItemsInterval && this.removeViewedItemsAfterSecond) this.removeElementOfList();
    if(itemIndex >= this.limit * (this.page - 1) + this.loadNextPageOnIndex) {
      this.loadNextPageHandler();
    }
    console.log('Run custom action of post :' , itemIndex)
  }

  removeElementOfList() {
    if(this.removeItemsInterval) return;
    this.removeItemsInterval = setInterval( () => {
      this.renderer.removeChild(this.postList, this.postList.nativeElement.firstChild);
      if (!this.postList.nativeElement.firstChild) {
        clearInterval(this.removeItemsInterval);
      }
    }, this.removeViewedItemsAfterSecond * 1000 )
  }

}
