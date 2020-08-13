import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { Storage } from "@ionic/storage";
import {Observable} from "rxjs";

@Injectable()
export class PoliticaService {


  today = new Date();

  localSource = "http://localhost:8000";

  serverSource = "";

  constructor(private _http: HttpClient, private storage: Storage) {}

  addPolitica (politca): Observable<any>{
    let json = JSON.stringify(politca);
    let params = 'json='+json;
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.post('http://localhost:8000/api/politicas/register',params , {headers : headers});
  }

  listPoliticas (): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/politicas', {headers : headers});
  }

  politicaById (id): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/politicas/'+id, {headers : headers});
  }
  politicaByName (name): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/politicas/name/'+name, {headers : headers});
  }


  updatePolitica (id,notificacion): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let json = JSON.stringify(notificacion);
    let params = 'json='+json;
    console.log(notificacion);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.put('http://localhost:8000/api/politicas/update/'+id,params , {headers : headers});
  }

  deletePolitica (id): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders()
    .set('Authorization',token.token);
    return this._http.delete('http://localhost:8000/api/politicas/delete/'+id, {headers : headers});
  }
  
}
