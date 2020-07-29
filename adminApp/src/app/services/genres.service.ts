import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { Storage } from "@ionic/storage";
import {Observable} from "rxjs";

@Injectable()
export class GenreService {


  today = new Date();

  localSource = "http://localhost:8000";

  serverSource = "";

  constructor(private _http: HttpClient, private storage: Storage) {}

  addGenre (genre): Observable<any>{
    let json = JSON.stringify(genre);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMiwiZW1haWwiOiJ1c3VhcmlvcHJ1ZWJhMkBob3RtYWlsLmNvbSIsIm5hbWUiOiJ1c3VhcmlvIiwiaWF0IjoxNTk1MzYxODM3LCJleHAiOjE1OTU5NjY2Mzd9.zbhRyho9tWUrgTLeqHu7aX6fydkOHeivVcstrkmrZe4');
    return this._http.post('http://localhost:8000/api/generos/register',params , {headers : headers});
  }

  listGenre (): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/generos', {headers : headers});
  }

  genreById (id): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/generos/id/'+id, {headers : headers});
  }


  updateGenre (id,genre): Observable<any>{
    let json = JSON.stringify(genre);
    let params = 'json='+json;
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.put('http://localhost:8000/api/generos/update/'+id,params , {headers : headers});
  }

  deleteGenre (id): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders()
    .set('Authorization',token.token);
    return this._http.delete('http://localhost:8000/api/generos/delete/'+id, {headers : headers});
  }
  
}
