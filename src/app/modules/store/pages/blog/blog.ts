import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreDataService } from '../../../../core/services/store-data-service';
import { BlogPosts } from '../../../../core/model/blog-posts.interface';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',

  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  private readonly storeDataService = inject(StoreDataService);
  private cdr = inject(ChangeDetectorRef);
  posts: BlogPosts[] = [];

  ngOnInit(): void {
    this.storeDataService.getBlogPosts().subscribe((posts) => {
      this.posts = posts;
      this.cdr.detectChanges();
    });
  }
}
