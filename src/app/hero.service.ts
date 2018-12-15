import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import { TodoVo } from './domain/todo.vo';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  refresh = new Subject<number>(); // publisher
  refresh$ = this.refresh.asObservable(); // subscriber
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${environment.HOST}/api/heroes`);
    // return of(HEROES).pipe(delay(1000));
  }

  getHero(hero_id: number): Observable<Hero> {
    // const hero = HEROES.find(item => item.hero_id === hero_id ? true : false);
    // return of(hero);
    return this.http.get<Hero>(`${environment.HOST}/api/hero/${hero_id}`);
  }

  getTodoList(): Observable<TodoVo[]> {
    return this.http.get<TodoVo[]>(`${environment.HOST}/api/todo`);
  }

  addTodo(todovo: TodoVo): Observable<TodoVo> {
    return this.http.post<TodoVo>(`${environment.HOST}/api/todo`, todovo, {headers: this.headers});
  }

  saveTodo(todovo: TodoVo): Observable<TodoVo> {
    return this.http.put<TodoVo>(`${environment.HOST}/api/todo`, todovo, {headers: this.headers});
  }
}
