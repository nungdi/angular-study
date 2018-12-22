import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  constructor(private authService: AuthGuardService) { }
}
