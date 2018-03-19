import { BaseEntity } from './../../shared';

export class Contact implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public surname?: string,
        public city?: string,
        public address?: string,
        public phone?: string,
    ) {
    }
}
