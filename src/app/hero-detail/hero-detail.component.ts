import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  childHero: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService) {
    this.route.params
      .subscribe(params => {
        console.log(params);

        // 서비스를 호출하여 그 결과를 childHero에 대입
        this.heroService.getHero(+params['hero_id'])
          .subscribe(data => this.childHero = data); // +는 스트링을 숫자로 변환

        // 추출된 파라미터를 부모에게 알린다.
        this.heroService.refresh.next(+params['hero_id']);
      });
  }

  getHero(id: number) {
    this.heroService.getHero(id)
      .subscribe(hero => this.childHero = hero);
  }

  ngOnInit() {
  }

}
