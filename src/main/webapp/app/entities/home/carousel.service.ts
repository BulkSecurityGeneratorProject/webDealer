import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Carousel } from './carousel.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CarouselService {

    private resourceUrl =  SERVER_API_URL + 'api/carousel';

    constructor(private http: Http) {}

    create(carousel: Carousel): Observable<Carousel> {
        const copy = this.convert(carousel);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(carousel: Carousel): Observable<Carousel> {
        const copy = this.convert(carousel);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Carousel> {
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
     * Convert a returned JSON object to Carousel.
     */
    private convertItemFromServer(json: any): Carousel {
        const entity: Carousel = Object.assign(new Carousel(), json);
        return entity;
    }

    /**
     * Convert a Carousel to a JSON which can be sent to the server.
     */
    private convert(carousel: Carousel): Carousel {
        const copy: Carousel = Object.assign({}, carousel);
        return copy;
    }
}
