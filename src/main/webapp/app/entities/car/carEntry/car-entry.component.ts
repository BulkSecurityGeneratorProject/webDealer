import {Component, Input, OnInit} from '@angular/core';
import {Car, Gear} from '../car.model';

@Component({
    selector: 'jhi-car-entry',
    templateUrl: './car-entry.component.html',
    styleUrls: [
        'car-entry.scss'
    ]
})

export class CarEntryComponent implements OnInit {

    @Input()
    private car: Car;
    private gear: string;
    constructor() {
    }

    ngOnInit(): void {
        this.gear = String(this.car.gear);
    }

}
