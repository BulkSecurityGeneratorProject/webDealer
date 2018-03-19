import { BaseEntity } from './../../shared';

export class Car implements BaseEntity {
    constructor(
        public id?: number,
        public make?: string,
        public model?: string,
        public price?: number,
        public color?: string,
        public mileage?: number,
        public imgContentType?: string,
        public img?: any,
        public received?: boolean,
        public description?: any,
    ) {
        this.received = false;
    }
}
