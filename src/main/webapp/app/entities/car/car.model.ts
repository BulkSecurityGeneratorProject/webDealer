import { BaseEntity } from './../../shared';

export const enum Gear {
    'MANUAL',
    'AUTOMATIC'
}

export class Car implements BaseEntity {
    constructor(
        public id?: number,
        public make?: string,
        public model?: string,
        public price?: number,
        public year?: number,
        public gear?: Gear,
        public version?: string,
        public capacity?: number,
        public power?: number,
        public color?: string,
        public mileage?: number,
        public imgContentType?: string,
        public img?: any,
        public description?: any,
        public created?: Date,
        public lastModified?: Date,
        public received?: boolean,
        public broken?: boolean,
    ) {
        this.received = false;
        this.broken = false;
    }
}
