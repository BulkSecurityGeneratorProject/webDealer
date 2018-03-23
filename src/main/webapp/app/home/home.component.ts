// <reference path="jquery.d.ts" />
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel, NgbCarouselConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

import * as $ from 'jquery';
import {CarouselConfig} from 'ngx-bootstrap';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ],
    providers: [
        { provide: CarouselConfig, useValue: { interval: 4000, noPause: false, showIndicators: false } }
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }
    toggleCaption() {
        const carouselContainer = $('.carousel');
        $('.carousel-caption').hide();
        const caption = carouselContainer.find('.active').find('.carousel-caption');
        caption.delay(500).animate({'width': 'toggle'});
    }

    ngOnInit() {
        this.toggleCaption();
        $('#carousel').carousel({
            interval: 4000
        }).on('slid.bs.carousel', () => {
            this.toggleCaption();
        });
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
