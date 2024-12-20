import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogModel } from './store/blog/blog.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private http = inject(HttpClient);

  constructor() {
  }

  getAllBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>('http://localhost:3000/Blogs');
  }

  addBlogs(blogInput: BlogModel) {
    return this.http.post('http://localhost:3000/Blogs', blogInput).pipe(
      tap(() => {
        this.http.get<BlogModel>('http://localhost:3000/Blogs' +
          '');
      })
    );
  }

  updateBlog(blogInput: BlogModel) {
    return this.http.put('http://localhost:3000/Blogs/' + blogInput.id, blogInput);
  }

  deleteBlog(blogId: number) {
    return this.http.delete(`http://localhost:3000/Blogs/'${blogId}`);
  }
}
