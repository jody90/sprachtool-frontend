import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }

    BACKEND_URL: string = "http://127.0.0.1:5000/api";
    HEADERS = new Headers({"Content-Type": "application/json"});

    url(part: string) {
        return this.BACKEND_URL + part;
    }

    postData(path: string, data: any) {
        return this.http.post(this.url(path), JSON.stringify(data), {headers: this.HEADERS});
    }

    getData(path: string) {
        return this.http.get(this.url(path), {headers: this.HEADERS})
            .map((response: Response) => {
                return response.json();
        });
    }

}