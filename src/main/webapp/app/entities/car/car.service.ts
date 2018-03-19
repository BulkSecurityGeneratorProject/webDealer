import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Car } from './car.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CarService {

    private resourceUrl =  SERVER_API_URL + 'api/cars';

    constructor(private http: Http) { }

    create(car: Car): Observable<Car> {
        const copy = this.convert(car);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(car: Car): Observable<Car> {
        const copy = this.convert(car);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Car> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
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
     * Convert a returned JSON object to Car.
     */
    private convertItemFromServer(json: any): Car {
        const entity: Car = Object.assign(new Car(), json);
        return entity;
    }

    /**
     * Convert a Car to a JSON which can be sent to the server.
     */
    private convert(car: Car): Car {
        const copy: Car = Object.assign({}, car);
        return copy;
    }
}
