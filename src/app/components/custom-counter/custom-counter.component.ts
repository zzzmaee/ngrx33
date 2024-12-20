import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as CounterActions from '../../shared/store/counter/counter.actions';
import { FormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { getTitle } from '../../shared/store/counter/counter.selectors';
import { AppModel } from '../../shared/Global/app.model';

@Component({
  selector: 'app-custom-counter',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatCardContent,
    FormsModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './custom-counter.component.html',
  styleUrl: './custom-counter.component.scss'
})
export class CustomCounterComponent implements OnInit {
  private store = inject(Store<AppModel>);
  counterInput!: number;
  actionType = 'add';
  welcomeMsg!: string;
  counterSubscribe!: Subscription;

  ngOnInit(): void {
    this.counterSubscribe = this.store.select(getTitle).subscribe(data => {
      this.welcomeMsg = data;
      console.log('title');
    });
  }

  onCounter() {
    this.store.dispatch(CounterActions.customCounter({value: +this.counterInput, action: this.actionType}));
  }

}
