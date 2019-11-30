import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy {

  // posts=[
  //     {title:"First Post",content:"This is the first post" },
  //     {title:"Second Post",content:"This is the second post" },
  //     {title:"Third Post",content:"This is the third post" }
  // ]


  totalPosts = 0;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, , 5, 10];
  posts: Post[] = [];
  currentPage = 1;
  private postSubs: Subscription;
  private authStatusSubs:Subscription;
  userIsAuthenticated = false;
  constructor(public postsService: PostsService , private authService: AuthService) { }

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postSubs = this.postsService.getPostsUpdateListner().subscribe((postData: { posts: Post[], postCount: number }) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getAuthStatusListner().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

  }

  deletePost(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postSubs.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }
}


