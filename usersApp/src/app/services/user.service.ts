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
    resetPass(correo){
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get('http://localhost:8000/api/users/recuperarcontrasena/'+ correo,{headers : headers});    
    }
    calificar(userId,perfilId,calificacion) : Observable<any>{
        let token = this.getIdentity().token;
        let user_id = this.getIdentity().userId;
        let headers = new HttpHeaders().set('Authorization',token);
        let params = perfilId + '/' + userId + '/' + calificacion;
        return this._http.get('http://localhost:8000/api/calificaciones/calificar/'+ params,{headers : headers});
    }
    calificacion(perfilId) : Observable<any>{
        let token = this.getIdentity().token;
        let user_id = this.getIdentity().userId;
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.get('http://localhost:8000/api/calificaciones/calificacion/'+ perfilId,{headers : headers});
    }
    perfilId(id = null): Observable<any>{
        let token = this.getIdentity().token;
        let user_id = this.getIdentity().userId;
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.get('http://localhost:8000/api/perfiles/usuario_id/'+ user_id,{headers : headers});
    } 
    perfilBy(filtro,valor): Observable<any>{
        let token = this.getIdentity().token;
        let user_id = this.getIdentity().userId;
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.get('http://localhost:8000/api/perfiles/'+filtro+'/'+valor,{headers : headers});
    } 
    userId(id){
        let token = this.getIdentity().token;
        let user_id = this.getIdentity().userId;
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.get('http://localhost:8000/api/users/id/'+ id,{headers : headers});
    }
    actualizarUsuario(idUsuario,user): Observable<any>{
        let token = this.getIdentity().token;
        let user_id = this.getIdentity().userId;
        let json = JSON.stringify(user);
        let params = 'json='+json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._http.put('http://localhost:8000/api/users/update/'+idUsuario,params , {headers : headers});
    }
    actualizarContrasena(data): Observable<any>{
        let json = JSON.stringify(data);
        let params = 'json='+json;
        console.log(params);
        let id = 1;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put('http://localhost:8000/api/users/updatepassword/'+id,params , {headers : headers});
    }
    actualizarPerfil(idPerfil,user): Observable<any>{
        let token = this.getIdentity().token;
        let user_id = this.getIdentity().userId;
        let json = JSON.stringify(user);
        let params = 'json='+json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._http.put('http://localhost:8000/api/perfiles/update/'+idPerfil,params , {headers : headers});
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