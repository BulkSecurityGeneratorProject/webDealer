import { BaseEntity } from './../../shared';

export class Home implements BaseEntity {
    constructor(
        public id?: number,
        public homeLabel?: string,
        public firstParagraph?: string,
        public secondParagraph?: string,
        public firstIcon?: string,
        public firstIconSubtitle?: string,
        public secondIcon?: string,
        public secondIconSubtitle?: string,
        public thirdIcon?: string,
        public thirdIconSubtitle?: string,
    ) {
    }
}
