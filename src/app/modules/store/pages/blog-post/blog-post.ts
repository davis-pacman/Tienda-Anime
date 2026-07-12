import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StoreDataService } from '../../../../core/services/store-data-service';
import { BlogPosts } from '../../../../core/model/blog-posts.interface';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css',
})
export class BlogPost implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly storeDataService = inject(StoreDataService);
  post?: BlogPosts;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.storeDataService.getBlogPostBySlug(slug).subscribe((post) => {
      this.post = post;
    });
  }
}
