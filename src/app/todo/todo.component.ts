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
  // 수정시 기존값을 저장 할 수 있는 컬렉션 생성
  tempMap = new Map<number, TodoVo>();

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

    // deep copy
    const tempTodo = Object.assign({}, todo);
    this.tempMap.set(todo.todo_id, tempTodo);
  }
  remove(todo_id: number) {
    if (confirm('삭제하시겠습니까?')) {
      this.heroService.removeTodo(todo_id)
        .subscribe(body => {
          if (body.result === 0) {
            // todo_id가 들어간 객체를 삭제.
            const idx = this.todoList.findIndex(item => item.todo_id === todo_id);
            this.todoList.splice(idx, 1);
          }
        });
    }
  }
  save(todo: TodoVo) {
    this.heroService.saveTodo(todo)
      .subscribe(body => {
        // todo = body 로 메모리 주소를 복사하는 것은 for 루프 에서 참조값을 바꾸는 것이기 때문에 지양해야 함.
        // 기존 객체에 새로운 객체의 퍼라퍼티를 복사한다.
        Object.assign(todo, body);

        // 템플릿 전환
        todo.isEdited = false;
      });
  }
  restore(todo: TodoVo) {
    // 복원
    const tempTodo = this.tempMap.get(todo.todo_id);
    Object.assign(todo, tempTodo);

    todo.isEdited = false;
  }
}
