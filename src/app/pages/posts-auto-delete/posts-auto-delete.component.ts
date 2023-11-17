import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {Post} from '../../shared/models/post';
import {PostService} from '../../shared/services/post.service';

@Component({
  selector: 'app-posts-auto-delete',
  templateUrl: './posts-auto-delete.component.html',
  styleUrls: ['./posts-auto-delete.component.scss']
})
export class PostsAutoDeleteComponent {
  posts: Post[] = [];
  /*
  * Last Page number
  * */
  page = 1;
  /*
  * Page size of list
  * */
  limit = 20;
  /*
  * Index of item from list which you want to send next page data request
  * */
  loadNextPageOnIndex = 15;
  /*
  * If you want to turn on auto delete item[0] of list set this number by second. Zero value means ignore it
  * */
  removeViewedItemsAfterSecond = 3;
  /*
  * The interval that respect to remove first child item from lisy*/
  removeItemsInterval: any;
  /*
  * During data request this will be true*/
  loading: boolean = false;
  /*
  * When the last page of data request triggered , It will be true*/
  isLastPage = false;

  /*
  * parent of list items*/
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
