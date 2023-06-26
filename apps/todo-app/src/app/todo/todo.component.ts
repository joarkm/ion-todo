import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  signal,
} from '@angular/core';
import { ActionSheetButton, IonicModule } from '@ionic/angular';
import { DataService, Todo } from '../services/data.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
      text: 'I dag (søndag)',
      role: 'destructive',
      data: {
        choice: 'today',
      },
    },
    {
      text: 'I morgen (mandag)',
      data: {
        choice: 'tomorrow',
      },
    },
    {
      text: 'Neste uke (mandag)',
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

  #calculateDueDate(choice: Omit<DueDateChoice, 'never'>): Date {
    // TODO: Calculate due date based on choice (today, tomorrow, next week) (use date-fns addWeeks etc.?)
    switch (choice) {
      case 'today':
        return new Date();
      case 'tomorrow':
        return new Date(); // Date-fns addDays(1)
      case 'nextWeek':
        return new Date(); // Date-fns addWeeks(1) (use startOfWeek)
    }
    return new Date();
  }
}
