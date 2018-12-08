import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import {HeroService} from '../hero.service';

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
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {
    // new로 객체 생성
    this.hero = new Hero(1, 'Winstorm');
    // this.hero.id = 1;
    // this.hero.name = 'Winstorm';

    this.isSpecial = true;

    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes()
      .subscribe(data => this.heroes = data);

    // 자식이 보내온
    this.heroService.refresh$
      .subscribe(hero_id => {
        this.selectedHero = HEROES.find(item => item.id === hero_id);
      });
  }

  ngOnInit() {
  }

  onSave(e) {
    console.log(e);
    alert('HELL:O');
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
