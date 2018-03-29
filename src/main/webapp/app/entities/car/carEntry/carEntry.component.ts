import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../car.model';

@Component({
    selector: 'jhi-car-entry',
    templateUrl: './carEntry.component.html',
    styleUrls: [
        'carEntry.scss'
    ]
})

export class CarEntryComponent implements OnInit {

    private nazwaKlasy: string;

    @Input()
    private car: Car;
    constructor() {
    }

    ngOnInit(): void {
        this.nazwaKlasy = this.car.broken ? 'red' : 'blue';
    }

}
