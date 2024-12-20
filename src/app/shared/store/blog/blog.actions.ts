import { createAction, props } from '@ngrx/store';
import { BlogModel } from './blog.model';

export const loadBlog = createAction('Load Blog');
export const loadBlogSuccess = createAction('Load Blog Success', props<{blogList: BlogModel[]}>());
export const loadBlogFail = createAction('Load Blog Fail', props<{errorText: string}>());
export const addBlog = createAction('Add Blog', props<{ blogInput: BlogModel }>());
export const addBlogSuccess = createAction('Add Blog Success', props<{ blogInput: BlogModel }>());
export const updateBlog = createAction('Update Blog', props<{ blogInput: BlogModel }>());
export const updateBlogSuccess = createAction('Update Blog Success', props<{ blogInput: BlogModel }>());
export const deleteBlog = createAction('Delete Blog', props<{ id: number }>());
export const deleteBlogSuccess = createAction('Delete Blog Success', props<{ id: number }>());
