import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogModel } from '../../shared/store/blog/blog.model';
import { AppModel } from '../../shared/Global/app.model';
import { Store } from '@ngrx/store';
import { addBlog, updateBlog } from '../../shared/store/blog/blog.actions';
import { getBlogById } from '../../shared/store/blog/blog.selectors';

// @ts-ignore
@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatInput,
    MatFormField,
    MatCard,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss'
})
export class AddBlogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<AddBlogComponent>);
  private fb = inject(FormBuilder);
  private store = inject(Store<AppModel>);
  pageTitle = '';
  editBlogId = 0;
  editData !: BlogModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit(): void {
    this.pageTitle = this.data.title;
    if (this.data.isEdit) {
      this.editBlogId = this.data.id;
      this.store.select(getBlogById(this.editBlogId)).subscribe(date => {
        this.editData = date;
        this.blogForm.setValue({
          id: this.editData.id,
          title: this.editData.title,
          description: this.editData.description
        });
      });
    }
  }

  blogForm = this.fb.group({
    id: [0],
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  closePopup() {
    this.dialogRef.close();
  }

  saveBlogs() {
    if (this.blogForm.valid) {
      const _blogInput: BlogModel = {
        id: 0,
        title: this.blogForm.value.title as string,
        description: this.blogForm.value.description as string,
      }
      if (this.data.isEdit) {
        _blogInput.id = this.blogForm.value.id as number;
        this.store.dispatch(updateBlog({blogInput: _blogInput}));
      } else {
        this.store.dispatch(addBlog({blogInput: _blogInput}));
      }
      this.closePopup();
    }
  }
}
