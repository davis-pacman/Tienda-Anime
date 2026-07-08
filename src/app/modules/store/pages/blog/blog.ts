import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreDataService } from '../../../../core/services/store-data-service';
import { BlogPost } from '../../../../core/model/blog-post.interface';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  private readonly storeDataService = inject(StoreDataService);
  posts: BlogPost[] = [];

  ngOnInit(): void {
    this.storeDataService.getBlogPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
