import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../hero';
import { Observable } from 'rxjs';
import { ResultVo } from '../domain/result.vo';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  addHero(hero: Hero): Observable<ResultVo> {
    return this.http.post<ResultVo>(`${environment.HOST}/api/hero`, hero, {headers: this.headers});
  }

  uploadImage(formData: FormData) {
    return this.http.post(`${environment.HOST}/api/file`, formData);
  }
}
