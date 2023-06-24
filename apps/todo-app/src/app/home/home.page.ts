import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { NgFor } from '@angular/common';
import { DataService, Todo } from '../services/data.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'ion-todo-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, TodoComponent],
})
export class HomePage {
  readonly #dataService = inject(DataService);

  getTodos(): Todo[] {
    return this.#dataService.getTodos();
  }
}
