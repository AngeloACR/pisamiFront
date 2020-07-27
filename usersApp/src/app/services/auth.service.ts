import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  endpoint = "/auth";

  today = new Date();

  localSource = "http://localhost:3400";

  serverSource = "";

  //mySource = this.localSource;
  mySource = this.serverSource;

  constructor(private http: HttpClient, private storage: Storage) {}

  login(logData: any) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    let body = {
      username: logData.username,
      password: logData.password
    };
    var address = this.mySource + this.endpoint + "/";
    return this.http.post(address, body, { headers: headers });
  }

  restore(data: any) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    let body = {
      mail: data.mail
    };
    var address = this.mySource + this.endpoint + "/restore";
    return this.http.post(address, body, { headers: headers });
  }
  resetPass(data: any) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    let body = {
      mail: data.mail
    };
    var address = this.mySource + this.endpoint + "/reset";
    return this.http.post(address, body, { headers: headers });
  }

  restorePass(data: any) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    let body = {
      password: data.password
    };
    var address = this.mySource + this.endpoint + "/restore";
    return this.http.post(address, body, { headers: headers });
  }

  logout = async function() {
    await this.storage.remove("loggedIn");
    await this.storage.remove("token");
    await this.storage.clear();
  };

  storeData = async function(storeData: any) {
    await this.storage.set("token", storeData.token);
    await this.storage.set("loggedIn", "true");
  };

  decode = async function() {
    try {
      let token = await this.storage.get("token");
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  };

  getType = async function() {
    try {
      let user = await this.decode();
      let type = user.tipoUsuario;
      return type;
    } catch (Error) {
      return null;
    }
  };

  primerInicio = async function() {
    try {
      let user = await this.decode();
      let primerInicio = user.primerInicio;
      return primerInicio;
    } catch (Error) {
      return null;
    }
  };

  isAuthenticated = async function() {
    try {
      let loggedIn = await this.storage.get("loggedIn");
      const isLogged = loggedIn == "true";
      return isLogged;
    } catch (Error) {
      return false;
    }
  };

  getToken = async function() {
    try {
      let token = await this.storage.get("token");
      return token;
    } catch (Error) {
      return null;
    }
  };
}
