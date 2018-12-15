import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  // 리터럴 객체로 객체 생성
  // hero: Hero = {
  //   hero_id: 1,
  //   name: 'WinStorm'
  // }

  hero: Hero;
  isSpecial = true;
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {
    // new 로 객체 생성
    this.hero = new Hero();
    this.hero.hero_id = 1;
    this.hero.name = 'WinStorm';

    // const heroService = new HeroService();
    this.heroService.getHeroes()
      .subscribe(data => this.heroes = data);

    // 자식이 보내온 파라메터를 받아서 선택된 열을 스타일링
    this.heroService.refresh$
      .subscribe(hero_id => {
        this.selectedHero = HEROES.find(item => item.hero_id === hero_id ? true : false);
      });

    // 라우터 이벤트 사용
    this.router.events
      .subscribe(event => {
        // console.log(event)
        if (event instanceof NavigationEnd) {
          if (event.url === '/heroes') {
            this.selectedHero = null;
          }
        }
      });
  }

  ngOnInit() {
  }

  onSave(e) {
    console.log(e);
    alert('hi');
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    console.log(hero);
  }
}
