import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { TodoVo } from '../domain/todo.vo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList: TodoVo[];
  newTodo = new TodoVo();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getTodoList()
      .subscribe(body => {
        console.log(body);
        this.todoList = body;
      });
  }

  addTodo() {
    // newTodo를 직렬화를 해야 할 것인가?
    // newTodo가 todo만 할당이 되고 나머지 4개는 undefined인데, 어떻게 될것인가?
    this.heroService.addTodo(this.newTodo)
      .subscribe(body => {
        // 넘어온 데이터를 todoList 맨 위에 추가
        this.todoList.unshift(body);
        // clear input
        this.newTodo.todo = null;
      });
  }

  modify(todo: TodoVo) {
    todo.isEdited = true;
  }
  restore(todo: TodoVo) {
    todo.isEdited = false;
  }
}
