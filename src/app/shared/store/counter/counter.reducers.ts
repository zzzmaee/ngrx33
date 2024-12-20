import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';
import { initialState } from './counter.state';

const _counterReducer = createReducer(
  initialState,

  on(CounterActions.increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1
    };
  }),

  on(CounterActions.decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1
    };
  }),

  on(CounterActions.reset, (state, action) => {
    return {
      ...state,
      counter: 0,
      welcomeMsg: action.title
    };
  }),

  on(CounterActions.customCounter, (state, action) => {
    return {
      ...state,
      counter: action.action == 'add' ? state.counter + action.value : state.counter - action.value
    };
  }),

  on(CounterActions.changeTitle, (state, action) => {
    return {
      ...state,
      welcomeMsg: action.title
    };
  }),
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
