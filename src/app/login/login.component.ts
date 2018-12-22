import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { MemberVo } from '../domain/member.vo';
import { Router } from '@angular/router';
import {AuthGuardService} from '../auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVo();

  constructor(private heroService: HeroService, private router: Router, private authService: AuthGuardService) { }

  ngOnInit() {
  }

  login() {
    this.heroService.login(this.member)
      .subscribe(body => {
        if (body.result === 0) {
          localStorage.setItem('token', body.data['token']);
          // 리다이렉션
          if (localStorage.getItem('redirect_urul')) {
            this.router.navigateByUrl(localStorage.getItem('redirect_urul'));
          } else {
            this.router.navigateByUrl('/');
          }
        }
      });
  }
}
