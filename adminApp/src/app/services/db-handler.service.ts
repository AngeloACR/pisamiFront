import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { forkJoin } from "rxjs";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class DbHandlerService {
  today = new Date();
  localSource = "http://localhost:5050";
  serverSource = "https://pisami.com";

  mySource = this.localSource
  //mySource = this.serverSource;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private storage: Storage
  ) {}

  postSomething = async function(body, endpoint) {
    try {
      let headers = new HttpHeaders();
      headers = headers.append("Content-Type", "application/json");
      let token = await this.auth.getToken();
      if (token != null) {
        headers = headers.append("Authorization", token);
      }
      var address = this.mySource;

      address = address + endpoint;

      return this.http.post(address, body, { headers: headers });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  getSomething = async function(endpoint) {
    try {
      let headers = new HttpHeaders();
      headers = headers.append("Content-Type", "application/json");
      let token = await this.auth.getToken();
      headers = headers.append("Authorization", token);
      var address = this.mySource;

      address = address + endpoint;

      return this.http.get(address, { headers: headers });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  putSomething = async function(body, endpoint) {
    try {
      let headers = new HttpHeaders();
      headers = headers.append("Content-Type", "application/json");
      let token = await this.auth.getToken();
      headers = headers.append("Authorization", token);

      var address = this.mySource;
      address = address + endpoint;

      return this.http.put(address, body, { headers: headers });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  deleteSomething = async function(endpoint) {
    try {
      let headers = new HttpHeaders();
      headers = headers.append("Content-Type", "application/json");
      let token = await this.auth.getToken();
      headers = headers.append("Authorization", token);

      let options = {
        headers: headers,
      };

      var address = this.mySource;
      address = address + endpoint;
      
      return this.http.delete(address, options);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  setLocal(name, value) {
    this.storage.remove(name);
    this.storage.set(name, JSON.stringify(value));
  }

  getLocal = async function(name) {
    try {
      let value = await this.storage.get(name);
      value = JSON.parse(value);
      return value;
    } catch (e) {
      console.log(e);
      return e;
    }
  };
}
