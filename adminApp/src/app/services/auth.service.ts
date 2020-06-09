import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DatePipe } from "@angular/common";
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

  prodSource = "";

  //mySource = this.localSource;
  mySource = this.serverSource;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private storage: Storage
  ) {}

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
  logout() {
    this.storage.remove("loggedIn");
    this.storage.remove("token");
    this.storage.clear();
    window.location.reload();
  }

  storeData(storeData: any) {
    this.storage.set("token", storeData.token);
    this.storage.set("loggedIn", "true");
  }

  resetPass(resetData: any) {}

  decode = async function() {
    try {
      let token = await this.storage.get("token");
      return jwt_decode(token);
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
