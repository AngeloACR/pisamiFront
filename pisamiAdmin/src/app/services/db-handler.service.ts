import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';
import { forkJoin } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class DbHandlerService {

	today = new Date;
	localSource = 'http://localhost:3400';
	serverSource = '';


	//mySource = this.localSource
	mySource = this.serverSource

	constructor(
		private http: HttpClient,
		private datePipe: DatePipe,
		private auth: AuthService,
		private storage: Storage
	) {
	}

	postSomething= async function(body, endpoint) {
		try{
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = await this.auth.getToken();
		if (token != null) {
			headers = headers.append('Authorization', token)
		}
		var address = this.mySource;

		address = address + endpoint;

		return this.http.post(address, body, { headers: headers });
		}
		catch(e){
			console.log(e)
			return e
		}

	}

	getSomething= async function(endpoint) {
		try{
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = await this.auth.getToken();
		headers = headers.append('Authorization', token)
		var address = this.mySource;

		address = address + endpoint;

		return this.http.get(address, { headers: headers });
		}
		catch(e){
			console.log(e)
			return e
		}
	}

	putSomething= async function(body, endpoint) {
		try{
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = await this.auth.getToken();
		headers = headers.append('Authorization', token)

		var address = this.mySource;
		address = address + endpoint;
		
		return this.http.put(address, body, { headers: headers });
		}
		catch(e){
			console.log(e)
			return e
		}
	}

	deleteSomething= async function(item, endpoint) {
		try{
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = await this.auth.getToken();
		headers = headers.append('Authorization', token)

		var address = this.mySource;

		address = address + endpoint;

	    item = JSON.stringify(item)
	
		let params = new HttpParams()
		params = params.append('item', item);

		let options = {
			headers: headers,
			params: params
		};

		return this.http.delete(address, options);
		}
		catch(e){
			console.log(e)
			return e
		}
	}

	setLocal(name, value) {
		this.storage.remove(name);
		this.storage.set(name, JSON.stringify(value));
	}

	getLocal= async function(name) {
		try{
		let value = await this.storage.get(name)
			value = JSON.parse(value);
			return value;
		}
		catch(e){
			console.log(e)
			return e
		}
	}

}
