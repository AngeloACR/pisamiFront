import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class FotoService{
    constructor(public _http: HttpClient){

    }
 public identity;
 public token;
    register (foto): Observable<any>{
        let json = JSON.stringify(foto);
        let params = 'json='+json;
        let token = JSON.parse(localStorage.getItem('identity'));
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token.token);
        return this._http.post('http://localhost:8000/api/fotos/register',params , {headers : headers});
    }
    listar (): Observable<any>{
        let token = JSON.parse(localStorage.getItem('identity'));
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token.token);
        return this._http.get('http://localhost:8000/api/links' , {headers : headers});
    }
    listById (id): Observable<any>{
        let token = JSON.parse(localStorage.getItem('identity'));
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token.token);
        return this._http.get('http://localhost:8000/api/fotos/perfil/'+id , {headers : headers});
    }

   

}