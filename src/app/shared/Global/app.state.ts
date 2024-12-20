import { counterReducer } from '../store/counter/counter.reducers';
import { blogReducer } from '../store/blog/blog.reducers';

export const AppState = {
  counter: counterReducer,
  blog: blogReducer
}
