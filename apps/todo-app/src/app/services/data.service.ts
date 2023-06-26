import { Injectable, signal } from '@angular/core';

export interface Todo {
  id: string;
  description: string;
  createdAt?: Date;
  completedAt?: Date;
  lastEditedAt?: Date;
  dueAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #todos: Todo[] = [
    {
      id: crypto.randomUUID(),
      description: 'Book trip to Vegas',
      createdAt: new Date('2021-01-01'),
      lastEditedAt: new Date('2021-01-01'),
    },
    {
      id: crypto.randomUUID(),
      description: 'Report Results',
      createdAt: new Date('2021-01-01'),
      lastEditedAt: new Date('2021-01-01'),
    },
    {
      id: crypto.randomUUID(),
      description: 'Update invitation for swim lessons',
      createdAt: new Date('2021-01-01'),
      lastEditedAt: new Date('2021-01-01'),
    },
  ];

  public todos = signal(this.#todos);

  public addTodo(todoMessage: string): void {
    this.todos.update((todos) => {
      const newTodos = [...todos];
      const now = new Date();
      newTodos.push({
        id: crypto.randomUUID(),
        description: todoMessage,
        createdAt: now,
        lastEditedAt: now,
      });
      return newTodos;
    });
  }

  public updateTodo(id: string, update: Omit<Partial<Todo>, 'id'>) {
    this.todos.update((todos) => {
      const newTodos = [...todos];
      const todo = newTodos.find((t) => t.id === id);
      if (todo) {
        Object.assign(todo, update);
      }
      return newTodos;
    });
  }

  public getTodoById(id: number): Todo {
    return this.todos()[id];
  }
}
