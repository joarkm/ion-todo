import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculateDueDate } from '@ion-todo/todo/shared/todo-utils';
import { ActionSheetButton, IonicModule } from '@ionic/angular';
import { format } from 'date-fns';

import { DataService, Todo } from '../services/data.service';

type DueDateChoice = 'today' | 'tomorrow' | 'nextWeek' | 'never';
interface DueDateChoiceData {
  choice: DueDateChoice | undefined;
}

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
  public actionSheetButtons: ActionSheetButton<DueDateChoiceData>[] = [
    {
      text: `I dag (${format(calculateDueDate('today'), 'iiii')})`,
      role: 'destructive',
      data: {
        choice: 'today',
      },
    },
    {
      text: `I morgen (${format(calculateDueDate('tomorrow'), 'iiii')})`,
      data: {
        choice: 'tomorrow',
      },
    },
    {
      text: `Neste uke (${format(calculateDueDate('nextWeek'), 'iiii')})`,
      data: {
        choice: 'nextWeek',
      },
    },
    {
      text: 'Aldri',
      data: {
        choice: 'never',
      },
    },
    {
      text: 'Avbryt',
      role: 'cancel',
      data: {
        choice: undefined,
      },
    },
  ];

  readonly #dataService = inject(DataService);

  addTodo(): void {
    this.#dataService.addTodo(this.newTodoMessage());
    this.newTodoMessage.set('');
  }

  dueDateChosen(e: any): void {
    this.#dueDateChosen((e as CustomEvent).detail.data.choice);
  }

  #dueDateChosen(choice: DueDateChoice | undefined): void {
    if (choice && choice !== 'never') {
      this.#dataService.updateTodo(this.todo.id, {
        dueAt: this.#calculateDueDate(choice),
      });
    }
  }

  #calculateDueDate(choice: 'today' | 'tomorrow' | 'nextWeek'): Date {
    return calculateDueDate(choice);
  }
}
