import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProcedureService} from './procedure.service';
import {Procedure} from './procedure.model';

@Injectable()
export class ProcedurePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private procedureService: ProcedureService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            this.procedureService.get().subscribe((procedure) => {
                this.ngbModalRef = this.procedureModalRef(component, procedure);
                resolve(this.ngbModalRef);
            });
        });
    }

    procedureModalRef(component: Component, procedure: Procedure): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.procedure = procedure;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
