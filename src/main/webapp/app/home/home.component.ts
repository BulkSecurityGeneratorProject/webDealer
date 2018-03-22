import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel, NgbCarouselConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

import * as $ from 'jquery';
import {CarouselConfig} from "ngx-bootstrap";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ],
    providers: [
        { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    images: Array<string>;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.images = [
            '../../content/images/ford-mustang-stallion-red-57409.jpeg',
            '../../content/images/ford-thunderbird-t-bird-car.jpg',
            '../../content/images/car-antique-50s-60s-48187.jpeg'
        ];
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
