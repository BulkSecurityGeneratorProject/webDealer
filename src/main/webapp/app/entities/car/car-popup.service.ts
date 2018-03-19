import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Car } from './car.model';
import { CarService } from './car.service';

@Injectable()
export class CarPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private carService: CarService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, received: boolean, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.carService.find(id).subscribe((car) => {
                    this.ngbModalRef = this.carModalRef(component, car, received);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.carModalRef(component, new Car(), received);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carModalRef(component: Component, car: Car, received: boolean): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        car.received = received !== null ? received : car.received;
        modalRef.componentInstance.car = car;
        modalRef.componentInstance.isEdit = received === null;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
