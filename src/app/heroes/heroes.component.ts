import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  // 리터럴 객체로 객체 생성
  // hero: Hero = {
  //   id: 1,
  //   name: 'Winstorm'
  // }

  hero: Hero;
  isSpecial: boolean;
  heroes = HEROES;

  constructor() {
    // new로 객체 생성
    this.hero = new Hero(1, 'Winstorm');
    // this.hero.id = 1;
    // this.hero.name = 'Winstorm';

    this.isSpecial = true;
  }

  ngOnInit() {
  }

  onSave(e) {
    console.log(e);
    alert('HELL:O');
  }

}
