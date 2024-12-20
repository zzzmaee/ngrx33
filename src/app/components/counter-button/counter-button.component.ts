import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CounterActions from '../../shared/store/counter/counter.actions';
import { MatButton } from '@angular/material/button';
import { CounterModel } from '../../shared/store/counter/counter.model';
import { AppModel } from '../../shared/Global/app.model';

@Component({
  selector: 'app-counter-button',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './counter-button.component.html',
  styleUrl: './counter-button.component.scss'
})
export class CounterButtonComponent {
  private store = inject(Store<AppModel>);


  onIncrement() {
    this.store.dispatch(CounterActions.increment());
  }

  onDecrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  onReset() {
    this.store.dispatch(CounterActions.reset({title: 'لا حول ولا قوة الا بالله العلي العظيم'}));
  }

  onChangeTitle() {
    this.store.dispatch(CounterActions.changeTitle({title: 'إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ'}));
  }
}
