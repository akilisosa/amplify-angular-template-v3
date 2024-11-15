import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { events } from 'aws-amplify/data';
import { AnimationStyleMetadata } from '@angular/animations';


const client = generateClient<Schema>();

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  todos: any[] = [];

  ngOnInit(): void {
    this.listTodos();
    this.openChannel();
    this.sendEvent();
  }

  async sendEvent() {
    await events.post('/default/test', {some: 'data'});

  }

  async openChannel() {
    const channel = await events.connect('/default/test');
    channel.subscribe({
  next: (data: AnimationStyleMetadata) => {
    console.log('received', data);
  },
  error: (err: any) => console.error('error', err),
});
  }

  listTodos() {
    try {
      client.models.Todo.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.todos = items;
        },
      });
    } catch (error) {
      console.error('error fetching todos', error);
    }
  }

  createTodo() {
    try {
      client.models.Todo.create({
        content: window.prompt('Todo content'),
      });
      this.listTodos();
    } catch (error) {
      console.error('error creating todos', error);
    }
  }
}
