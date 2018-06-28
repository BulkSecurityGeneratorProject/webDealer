import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Home } from './home.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HomeService {

    private resourceUrl =  SERVER_API_URL + 'api/home';

    constructor(private http: Http) {}

    create(home: Home): Observable<Home> {
        const copy = this.convert(home);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(home: Home): Observable<Home> {
        const copy = this.convert(home);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Home> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    get(): Observable<Home> {
        return this.http.get(`${this.resourceUrl}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Home.
     */
    private convertItemFromServer(json: any): Home {
        const entity: Home = Object.assign(new Home(), json);
        return entity;
    }

    /**
     * Convert a Home to a JSON which can be sent to the server.
     */
    private convert(home: Home): Home {
        const copy: Home = Object.assign({}, home);
        return copy;
    }
}
