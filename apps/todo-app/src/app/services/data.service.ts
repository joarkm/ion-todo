import { Injectable } from '@angular/core';

export interface Todo {
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public todos: Todo[] = [
    {
      description: 'Book trip to Vegas',
    },
    {
      description: 'Report Results',
    },
    {
      description: 'Update invitation for swim lessons',
    },
  ];

  public getTodos(): Todo[] {
    return this.todos;
  }

  public getTodoById(id: number): Todo {
    return this.todos[id];
  }
}
