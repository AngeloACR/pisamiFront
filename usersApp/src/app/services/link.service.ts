import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class LinkService{
    constructor(public _http: HttpClient){

    }
 public identity;
 public token;
    register (link): Observable<any>{
        let json = JSON.stringify(link);
        let params = 'json='+json;
        let token = JSON.parse(localStorage.getItem('identity'));
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token.token);
        return this._http.post('http://localhost:8000/api/links/register',params , {headers : headers});
    }
    listar (): Observable<any>{
        let token = JSON.parse(localStorage.getItem('identity'));
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token.token);
        return this._http.get('http://localhost:8000/api/links' , {headers : headers});
    }
    listByName (nombre): Observable<any>{
        let token = JSON.parse(localStorage.getItem('identity'));
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token.token);
        return this._http.get('http://localhost:8000/api/links/name/'+nombre , {headers : headers});
    }

   

}