import {BaseEntity} from '../../../shared';

export class Carousel implements BaseEntity {

    constructor(
        public id?: number,
        public title?: string,
        public subtitle?: string
    ) {
    }
}
