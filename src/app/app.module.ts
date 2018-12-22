import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JqueryComponent } from './jquery/jquery.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MydatePipe } from './mydate.pipe';
import { HighlightDirective } from './highlight.directive';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'heroes', component: HeroesComponent, children: [
      {path: ':hero_id', component: HeroDetailComponent},
    ]},
  {path: 'jquery', component: JqueryComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'login', component: LoginComponent},
  // lazy-loading: 접근전까지는 로딩이 되지 않음
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    HomeComponent,
    TodoComponent,
    JqueryComponent,
    MydatePipe,
    HighlightDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule // bootstrap 모듈
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
