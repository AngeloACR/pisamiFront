import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';
import { forkJoin } from 'rxjs';

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
		private auth: AuthService
	) {
	}

	postSomething(body, endpoint) {
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = this.auth.getToken();
		if (token != null) {
			headers = headers.append('Authorization', token)
		}
		var address = this.mySource;

		address = address + endpoint;

		return this.http.post(address, body, { headers: headers });

	}

	getSomething(endpoint) {
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = this.auth.getToken();
		headers = headers.append('Authorization', token)
		var address = this.mySource;

		address = address + endpoint;

		return this.http.get(address, { headers: headers });
	}

	putSomething(body, endpoint) {
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = this.auth.getToken();
		headers = headers.append('Authorization', token)

		var address = this.mySource;

		address = address + endpoint;


		return this.http.put(address, body, { headers: headers });
	}

	deleteSomething(item, endpoint) {
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = this.auth.getToken();
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

	setLocal(name, value) {
		localStorage.removeItem(name);
		localStorage.setItem(name, JSON.stringify(value));
	}

	getLocal(name) {
		var value = JSON.parse(localStorage.getItem(name));
		return value;
	}

}
