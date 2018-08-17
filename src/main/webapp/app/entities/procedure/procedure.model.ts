import { BaseEntity } from '../../shared';

export class Procedure implements BaseEntity {
    constructor(
        public id?: number,
        public text?: any
    ) {
    }
}
