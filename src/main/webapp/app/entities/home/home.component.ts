// <reference path="jquery.d.ts" />
import {Component, HostListener, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Account, LoginModalService, Principal, ResponseWrapper} from '../../shared';

import {CarouselConfig} from 'ngx-bootstrap';
import {Lightbox} from 'ngx-lightbox';
import {DomSanitizer} from '@angular/platform-browser';
import {Home, HomeService} from './';
import {Subscription} from 'rxjs/Subscription';

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
    eventSubscriber: Subscription;
    home: Home;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private lightbox: Lightbox,
        private sanitizer: DomSanitizer,
        private homeService: HomeService,
    ) {
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.loadAll();
        this.registerAuthenticationSuccess();
        this.registerChangeInHome();
        // this.fixInternetExplorerParallax();
    }
    fixInternetExplorerParallax() {
        if (navigator.userAgent.match(/Trident\/7\./)) {
            $('body').on('mousewheel', function () {
                event.preventDefault();

                const wheelDelta = event['wheelDelta'];

                const currentScrollPosition = window.pageYOffset;
                window.scrollTo(0, currentScrollPosition - wheelDelta);
            });

            $('body').keydown(function (e) {
                e.preventDefault(); // prevent the default action (scroll / move caret)
                const currentScrollPosition = window.pageYOffset;

                switch (e.which) {

                    case 38: // up
                        window.scrollTo(0, currentScrollPosition - 120);
                        break;

                    case 40: // down
                        window.scrollTo(0, currentScrollPosition + 120);
                        break;

                    default: return; // exit this handler for other keys
                }
            });
        }
    }
    loadAll() {
        this.homeService.get().subscribe(
            (res: Home) => {
                this.home = res;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    registerChangeInHome() {
        this.eventSubscriber = this.eventManager.subscribe('homeModification', (response) => this.loadAll());
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
            albums.push({src: this.sanitizer.bypassSecurityTrustUrl(target.target.getAttribute('src').substring(0, target.target.getAttribute('src').lastIndexOf('.')) + '_large.jpg')});
            this.lightbox.open(albums, 0);
        }
    }

    private onError(err: any) {
        console.log(err);
    }
}
