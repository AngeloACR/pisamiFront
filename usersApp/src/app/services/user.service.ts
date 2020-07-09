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

}