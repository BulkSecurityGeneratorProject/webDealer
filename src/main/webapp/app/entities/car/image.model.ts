import {BaseEntity} from '../../shared';

export class Image implements BaseEntity{
    constructor(
                public id?: number,
                public img?: any,
                public main?: boolean,
                public imgContentType?: string)
    {
        this.main = false;
    }
}
