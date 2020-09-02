import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { Storage } from "@ionic/storage";
import {Observable} from "rxjs";

@Injectable()
export class FavoritoService {


  today = new Date();

  localSource = "http://localhost:8000";

  serverSource = "";

  constructor(private _http: HttpClient, private storage: Storage) {}

  addFavorito (perfilId,userId): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/favoritos/register/'+perfilId+'/'+userId , {headers : headers});
  }

  listGenre (): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/generos', {headers : headers});
  }

  favoritosById (id): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/favoritos/'+id, {headers : headers});
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
  isfav (userId,perfilId): Observable<any>{
    let token = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders()
    .set('Authorization',token.token);
    return this._http.get('http://localhost:8000/api/favoritos/isfav/'+userId+'/'+perfilId, {headers : headers});
  }
  
}
