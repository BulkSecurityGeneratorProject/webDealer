import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {ProcedurePopupService} from './procedure.popup.service';
import {Procedure} from './procedure.model';
import {ProcedureService} from './procedure.service';

@Component({
    selector: 'jhi-procedure-dialog',
    templateUrl: './procedure-dialog.component.html'
})
export class ProcedureDialogComponent implements OnInit {

    procedure: Procedure;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private procedureService: ProcedureService,
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
        if (this.procedure.id !== undefined) {
            this.subscribeToSaveResponse(
                this.procedureService.update(this.procedure));
        } else {
            this.subscribeToSaveResponse(
                this.procedureService.create(this.procedure));
        }
    }

    private subscribeToSaveResponse(result: Observable<Procedure>) {
        result.subscribe((res: Procedure) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Procedure) {
        this.eventManager.broadcast({ name: 'procedureModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-procedure-popup',
    template: ''
})
export class ProcedurePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private procedurePopupService: ProcedurePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.procedurePopupService
                    .open(ProcedureDialogComponent as Component, params['id']);
            } else {
                this.procedurePopupService
                    .open(ProcedureDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
