// <reference path="jquery.d.ts" />
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel, NgbCarouselConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Account, LoginModalService, Principal} from '../shared';

import * as $ from 'jquery';
import {CarouselConfig} from 'ngx-bootstrap';
import {Lightbox} from 'ngx-lightbox';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ],
    providers: [
        {provide: CarouselConfig, useValue: {interval: 4000, noPause: false, showIndicators: false}}
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private lightbox: Lightbox,
        private sanitizer: DomSanitizer
    ) {
    }
    ngOnInit() {
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

    @HostListener('click')
    open(target) {
        if (target) {
            const albums = [];
            albums.push({src: this.sanitizer.bypassSecurityTrustUrl(target.target.getAttribute('src'))});
            this.lightbox.open(albums, 0);
        }
    }
}
