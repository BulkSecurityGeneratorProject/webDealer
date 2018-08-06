import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {Home} from './home.model';
import {HomeService} from './home.service';
import {HomePopupService} from './home-popup.service';

@Component({
    selector: 'jhi-home-dialog',
    templateUrl: './home-dialog.component.html'
})
export class HomeDialogComponent implements OnInit {

    home: Home;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private homeService: HomeService,
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
        if (this.home.id !== undefined) {
            this.subscribeToSaveResponse(
                this.homeService.update(this.home));
        } else {
            this.subscribeToSaveResponse(
                this.homeService.create(this.home));
        }
    }

    private subscribeToSaveResponse(result: Observable<Home>) {
        result.subscribe((res: Home) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Home) {
        this.eventManager.broadcast({ name: 'homeModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-home-popup',
    template: ''
})
export class HomePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private homePopupService: HomePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.homePopupService
                    .open(HomeDialogComponent as Component, params['id']);
            } else {
                this.homePopupService
                    .open(HomeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
