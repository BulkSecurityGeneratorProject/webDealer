import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ResponseWrapper, createRequestOption } from '../../shared';
import {Procedure} from './procedure.model';

@Injectable()
export class ProcedureService {

    private resourceUrl =  SERVER_API_URL + 'api/procedure';

    constructor(private http: Http) {}

    create(procedure: Procedure): Observable<Procedure> {
        const copy = this.convert(procedure);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(procedure: Procedure): Observable<Procedure> {
        const copy = this.convert(procedure);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Procedure> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    get(): Observable<Procedure> {
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
    private convertItemFromServer(json: any): Procedure {
        const entity: Procedure = Object.assign(new Procedure(), json);
        return entity;
    }

    /**
     * Convert a Home to a JSON which can be sent to the server.
     */
    private convert(procedure: Procedure): Procedure {
        const copy: Procedure = Object.assign({}, procedure);
        return copy;
    }
}
