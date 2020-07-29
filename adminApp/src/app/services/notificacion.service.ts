import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { Storage } from "@ionic/storage";
import {Observable} from "rxjs";

@Injectable()
export class NotificacionService {


  today = new Date();

  localSource = "http://localhost:8000";

  serverSource = "";

  constructor(private _http: HttpClient, private storage: Storage) {}

  addNotificacion (notificacion): Observable<any>{
    let json = JSON.stringify(notificacion);
    let params = 'json='+json;
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.post('http://localhost:8000/api/notificaciones/register',params , {headers : headers});
  }

  listNotificacion (): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/notificaciones', {headers : headers});
  }

  notificacionById (id): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/notificaciones/'+id, {headers : headers});
  }


  updateNotificacion (id,notificacion): Observable<any>{
    let json = JSON.stringify(notificacion);
    let params = 'json='+json;
    console.log(notificacion);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMiwiZW1haWwiOiJ1c3VhcmlvcHJ1ZWJhMkBob3RtYWlsLmNvbSIsIm5hbWUiOiJ1c3VhcmlvIiwiaWF0IjoxNTk1MzYxODM3LCJleHAiOjE1OTU5NjY2Mzd9.zbhRyho9tWUrgTLeqHu7aX6fydkOHeivVcstrkmrZe4');
    return this._http.put('http://localhost:8000/api/notificaciones/update/'+id,params , {headers : headers});
  }

  deleteNotificacion (id): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders()
    .set('Authorization',token.token);
    return this._http.delete('http://localhost:8000/api/notificaciones/delete/'+id, {headers : headers});
  }
  
}
