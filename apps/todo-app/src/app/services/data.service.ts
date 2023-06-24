import { Injectable, signal } from '@angular/core';

export interface Todo {
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #todos: Todo[] = [
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

  public todos = signal(this.#todos);

  public addTodo(todoMessage: string): void {
    this.todos.update((todos) => {
      const newTodos = [...todos];
      newTodos.push({
        description: todoMessage,
      });
      return newTodos;
    });
  }

  public getTodoById(id: number): Todo {
    return this.todos()[id];
  }
}
