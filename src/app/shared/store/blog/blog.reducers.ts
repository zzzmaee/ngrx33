import { createReducer, on } from '@ngrx/store';
import { BlogState } from './blog.state';
import * as BlogActions from './blog.actions';

export const _blogReducer = createReducer(
  BlogState,

  on(BlogActions.loadBlog, (state) => {
    return {
      ...state
    };
  }),

  on(BlogActions.loadBlogSuccess, (state, action) => {
    return {
      ...state,
      blogList: [...action.blogList],
      errorMsg: ''
    };
  }),

  on(BlogActions.loadBlogFail, (state, action) => {
    return {
      ...state,
      blogList: [],
      errorMsg: action.errorText
    };
  }),

  // on(BlogActions.addBlog, (state, action) => {
  //   const _blog = {...action.blogInput};
  //   _blog.id = state.blogList.length + 1;
  //   return {
  //     ...state,
  //     blogList: [...state.blogList, _blog]
  //   };
  // }),

  on(BlogActions.addBlogSuccess, (state, action) => {
    const _blog = {...action.blogInput};
    return {
      ...state,
      blogList: [...state.blogList, _blog]
    };
  }),

  on(BlogActions.updateBlogSuccess, (state, action) => {
    const _blog = {...action.blogInput};
    const updatedBlog = state.blogList.map(blog => {
      return _blog.id === blog.id ? _blog : blog;
    });
    return {
      ...state,
      blogList: updatedBlog
    };
  }),

  on(BlogActions.deleteBlogSuccess, (state, action) => {
    const deletedBlog = state.blogList.filter(data =>{
      return data.id !== action.id
    })
    return {
      ...state,
      blogList: deletedBlog
    };
  }),
);

export function blogReducer(state: any, action: any) {
  return _blogReducer(state, action);
}
