import {Component, Input, OnInit} from '@angular/core';
import {Car, Gear} from '../car.model';
import {Image} from '../image.model';

@Component({
    selector: 'jhi-car-entry',
    templateUrl: './car-entry.component.html',
    styleUrls: [
        'car-entry.scss'
    ]
})

export class CarEntryComponent implements OnInit {

    @Input()
    car: Car;

    @Input()
    received: boolean;

    gear: string;
    constructor() {
    }

    ngOnInit(): void {
        this.gear = String(this.car.gear);
    }

    getMainImage(): string {
        let em: Image;
        for (let i = 0 ; i < this.car.images.length ; i++) {
            if (this.car.images[i].main === true) {
                em = this.car.images[i];
            }
        }
        if (em === undefined) {
            em = this.car.images[0];
        }
        return 'data:' + em.imgContentType + ';base64,' + em.thumbnail;
    }
}
