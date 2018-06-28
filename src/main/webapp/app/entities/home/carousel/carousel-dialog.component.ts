import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {Carousel} from './carousel.model';
import {CarouselService} from './carousel.service';
import {CarouselPopupService} from './carousel-popup.service';

@Component({
    selector: 'jhi-carousel-dialog',
    templateUrl: './carousel-dialog.component.html'
})
export class CarouselDialogComponent implements OnInit {

    carousel: Carousel[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private carouselService: CarouselService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
            this.subscribeToSaveResponse(
                this.carouselService.update(this.carousel));
    }

    private subscribeToSaveResponse(result: Observable<Carousel>) {
        result.subscribe((res: Carousel) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Carousel) {
        this.eventManager.broadcast({ name: 'carouselModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-carousel-popup',
    template: ''
})
export class CarouselPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carouselPopupService: CarouselPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.carouselPopupService
                    .open(CarouselDialogComponent as Component, params['id']);
            } else {
                this.carouselPopupService
                    .open(CarouselDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
