import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class UserService{
    constructor(public _http: HttpClient){

    }
 public identity;
 public token;
    register (user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.post('http://localhost:8000/api/users/register',params , {headers : headers});
    }

    signup(user, gettoken = null) : Observable<any>{
        if(gettoken != null){
            user.gettoken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.post('http://localhost:8000/api/users/login',params , {headers : headers});
    } 
    perfilId(id = null): Observable<any>{
        let headers = new HttpHeaders().set('Authorization','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMiwiZW1haWwiOiJ1c3VhcmlvcHJ1ZWJhMkBob3RtYWlsLmNvbSIsIm5hbWUiOiJ1c3VhcmlvIiwiaWF0IjoxNTk0NjUyNjQ4LCJleHAiOjE1OTUyNTc0NDh9._XmlwjeASZz55VHzkIfUqukMr72atKu61mmt5exFOuc');
        return this._http.get('http://localhost:8000/api/perfiles/usuario_id/121',{headers : headers});
    } 
    actualizarPerfil(user): Observable<any>{
        
        let json = JSON.stringify(user);
        let params = 'json='+json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMiwiZW1haWwiOiJ1c3VhcmlvcHJ1ZWJhMkBob3RtYWlsLmNvbSIsIm5hbWUiOiJ1c3VhcmlvIiwiaWF0IjoxNTk0NjUyNjQ4LCJleHAiOjE1OTUyNTc0NDh9._XmlwjeASZz55VHzkIfUqukMr72atKu61mmt5exFOuc');
        return this._http.put('http://localhost:8000/api/perfiles/update/21',params , {headers : headers});
    }   
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity && identity != "undefined"){
            this.identity = identity;
        }
        else{
            this.identity = null;
        }
        return this.identity;
    }
    getToken(){
        let token = JSON.parse(localStorage.getItem('token'));
        if(token && token != "undefined"){
            this.token = token;
        }
        else{
            this.token = null;
        }
        return this.token;

    }

    listaUsuarios(): Observable<any>{
        let headers = new HttpHeaders().set('Authorization','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMiwiZW1haWwiOiJ1c3VhcmlvcHJ1ZWJhMkBob3RtYWlsLmNvbSIsIm5hbWUiOiJ1c3VhcmlvIiwiaWF0IjoxNTk0NjUyNjQ4LCJleHAiOjE1OTUyNTc0NDh9._XmlwjeASZz55VHzkIfUqukMr72atKu61mmt5exFOuc');
        return this._http.get('http://localhost:8000/api/users',{headers : headers});
    } 

}