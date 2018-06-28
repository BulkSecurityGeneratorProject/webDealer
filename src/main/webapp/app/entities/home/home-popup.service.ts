import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Home} from './home.model';
import {HomeService} from './home.service';

@Injectable()
export class HomePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private homeService: HomeService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            this.homeService.get().subscribe((home) => {
                this.ngbModalRef = this.homeModalRef(component, home);
                resolve(this.ngbModalRef);
            });
        });
    }

    homeModalRef(component: Component, home: Home): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.home = home;
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
