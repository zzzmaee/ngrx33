import { CounterModel } from '../store/counter/counter.model';
import { BlogModel, Blogs } from '../store/blog/blog.model';

export interface AppModel {
  counter: CounterModel,
  blog: Blogs
}
