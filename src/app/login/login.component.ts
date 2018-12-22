import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { MemberVo } from '../domain/member.vo';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVo();

  constructor(private heroService: HeroService, private router: Router, private authService: AuthGuardService, private toastService: ToasterService) { }

  ngOnInit() {
  }

  login() {
    this.heroService.login(this.member)
      .subscribe(body => {
        if (body.result === 0) {
          localStorage.setItem('token', body.data['token']);
          // 리다이렉션
          if (localStorage.getItem('redirect_url')) {
            this.router.navigateByUrl(localStorage.getItem('redirect_url'));
          } else {
            this.router.navigateByUrl('/');
          }
          // 성공 토스트팝업
          this.toastService.pop('success', '로그인', `환영합니다! ${body.data['token']}님`);
        } else {
          this.toastService.pop('error', '로그인', `${body.value}. 로그인에 실패하였습니다`);
        }
      });
  }
}
