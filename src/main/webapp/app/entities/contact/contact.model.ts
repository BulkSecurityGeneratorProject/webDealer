import { BaseEntity } from '../../shared';

export class Contact implements BaseEntity {
    constructor(
        public id?: number,
        public name1?: string,
        public name2?: string,
        public surname1?: string,
        public surname2?: string,
        public city?: string,
        public address?: string,
        public phone1?: string,
        public phone2?: string,
        public email1?: string,
        public email2?: string,
    ) {
    }
}
