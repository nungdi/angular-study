import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // 데이터를 Observable로 변환
  getHeroes(): Observable<Hero[]> {
    return of(HEROES).pipe(delay(1000));
  }

}
