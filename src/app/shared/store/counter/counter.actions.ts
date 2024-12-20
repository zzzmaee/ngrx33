import { createAction, props } from '@ngrx/store';

export const increment = createAction('Increment');
export const decrement = createAction('Decrement');
export const reset = createAction('Reset', props<{title: string}>());
export const customCounter = createAction('Custom Counter', props<{ value: number, action: string }>());
export const changeTitle = createAction('Change Title', props<{ title: string }>());
