import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModel } from '../../shared/Global/app.model';
import { BlogModel, Blogs } from '../../shared/store/blog/blog.model';
import { getBlog, getBlogInfo } from '../../shared/store/blog/blog.selectors';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { MatIcon } from '@angular/material/icon';
import * as BlogActions from '../../shared/store/blog/blog.actions';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    NgForOf,
    MatButton,
    MatIcon,
    NgIf
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private store = inject(Store<AppModel>);
  private dialog = inject(MatDialog);
  blogList!: BlogModel[];
  blogInfo!: Blogs;

  ngOnInit(): void {
    this.store.dispatch(BlogActions.loadBlog())
    this.store.select(getBlogInfo).subscribe(data => {
      this.blogInfo = data
      // this.blogList = data;
    });
  }

  openPopup(id: number, title: string, isEdit: boolean) {
    this.dialog.open(AddBlogComponent, {
      width: '40%',
      data: {
        id: id,
        title: title,
        isEdit: isEdit
      }
    });
  }

  addBlog() {
    this.openPopup(0, 'Add Blog', false);
  }

  updateBlog(id: number) {
    this.openPopup(id, 'Edit Blog', true);
  }

  deleteBlog(id: number) {
    this.store.dispatch(BlogActions.deleteBlog({id:id}));
  }
}
