import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterService } from '../../master.service';
import * as BlogActions from './blog.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BlogModel } from './blog.model';

@Injectable()
export class BlogEffects {
  private action$ = inject(Actions);
  private service = inject(MasterService);

  _loadBlog = createEffect(() =>
    this.action$.pipe(
      ofType(BlogActions.loadBlog),
      exhaustMap((action) => {
        return this.service.getAllBlogs().pipe(
          map((data) => {
            return BlogActions.loadBlogSuccess({blogList: data});
          }),
          catchError((_error) => of(BlogActions.loadBlogFail({errorText: _error.message})))
        );
      })
    )
  );

  _addBlog = createEffect(() =>
    this.action$.pipe(
      ofType(BlogActions.addBlog),
      exhaustMap(action => {
        return this.service.addBlogs(action.blogInput).pipe(
          map((data) => {
            return BlogActions.addBlogSuccess({blogInput: data as BlogModel});
          }),
          catchError((_error) => of(BlogActions.loadBlogFail({errorText: _error.message})))
        );
      })
    )
  );

  _updateBlog = createEffect(() =>
    this.action$.pipe(
      ofType(BlogActions.updateBlog),
      exhaustMap(action => {
        return this.service.updateBlog(action.blogInput).pipe(
          map(() => {
            return BlogActions.updateBlogSuccess({blogInput: action.blogInput});
          }),
          catchError((_error) => of(BlogActions.loadBlogFail({errorText: _error.message})))
        );
      })
    )
  );

  _deleteBlog = createEffect(() =>
    this.action$.pipe(
      ofType(BlogActions.deleteBlog),
      exhaustMap(action => {
        return this.service.deleteBlog(action.id).pipe(
          map(() => {
            return BlogActions.deleteBlogSuccess({id  : action.id});
          }),
          catchError((_error) => of(BlogActions.loadBlogFail({errorText: _error.message})))
        );
      })
    )
  );
}
