import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DataService, Todo } from '../services/data.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ion-todo-todo',
  standalone: true,
  imports: [NgIf, IonicModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo!: Todo;
  placeholderText = 'Add a new todo';
  newTodoMessage = signal('');
  inEditMode = false;

  readonly #dataService = inject(DataService);

  addTodo(): void {
    this.#dataService.addTodo(this.newTodoMessage());
    this.newTodoMessage.set('');
  }
}
