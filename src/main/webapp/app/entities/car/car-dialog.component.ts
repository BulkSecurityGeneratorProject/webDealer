import {Component, OnInit, OnDestroy, ElementRef, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiDataUtils} from 'ng-jhipster';

import {Car} from './car.model';
import {CarPopupService} from './car-popup.service';
import {CarService} from './car.service';
import {Image} from './image.model';
import * as $ from 'jquery';

@Component({
    selector: 'jhi-car-dialog',
    templateUrl: './car-dialog.component.html',
    styleUrls: ['car-dialog.scss']
})
export class CarDialogComponent implements OnInit {

    car: Car;
    isEdit: boolean;
    isSaving: boolean;
    radioSelectIndex: number;

    constructor(public activeModal: NgbActiveModal,
                private dataUtils: JhiDataUtils,
                private carService: CarService,
                private elementRef: ElementRef,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.selectRadio();
    }

    selectRadio(): boolean {
        let ind: number;
        if (this.car.images) {
            for (let i = 0; i < this.car.images.length; i++) {
                if (this.car.images[i].main === true) {
                    ind = i;
                }
            }
            if (ind !== undefined) {
                this.radioSelectIndex = ind;
                return true;
            }
        }
        return false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, field, isImage) {
        if (this.car.images === undefined) {
            this.car.images = [];
        }
        const obj = {
            img: null,
            type: null
        };
        obj.img = null;
        obj.type = null;
        this.dataUtils.setFileData(event, obj, field, isImage, () => {
            this.car.images.push(new Image(undefined, obj.img, null, false, obj.type));
            if (!this.selectRadio()) {
                this.radioSelectIndex = 0;
                this.change();
            }
        });
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string, index: number) {
        this.dataUtils.clearInputImage(this.car, this.elementRef, field, fieldContentType, idInput, index, () => {
            if (!this.selectRadio()) {
                if (this.car.images.length > 0) {
                    if (this.radioSelectIndex === 0) {
                        if (this.car.images.length === 1) {
                            $('.checkbox-car.radio').prop('checked', true);
                        }
                        else {
                            console.log($('.checkbox-car.radio:nth-child(2)'));
                            $('.checkbox-car.radio:nth-child(2)').prop('checked', true);
                        }
                    }
                    else {
                        this.radioSelectIndex = 0;
                    }
                    this.change();
                }
            }
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.car.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carService.update(this.car));
        } else {
            this.subscribeToSaveResponse(
                this.carService.create(this.car));
        }
    }

    change() {
        for (let i = 0; i < this.car.images.length; i++) {
            this.car.images[i].main = false;
        }
        this.car.images[this.radioSelectIndex].main = true;
    }

    private subscribeToSaveResponse(result: Observable<Car>) {
        result.subscribe((res: Car) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Car) {
        this.eventManager.broadcast({name: 'carListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}

@Component({
    selector: 'jhi-car-popup',
    template: ''
})
export class CarPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private carPopupService: CarPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            const received = params['received'] ? (params['received'] === 'received') : null;
            if (params['id']) {
                this.carPopupService
                    .open(CarDialogComponent as Component, received, params['id']);
            } else {
                this.carPopupService
                    .open(CarDialogComponent as Component, received);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
