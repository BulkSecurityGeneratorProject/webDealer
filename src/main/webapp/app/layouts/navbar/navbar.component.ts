import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager, JhiLanguageService} from 'ng-jhipster';

import {ProfileService} from '../profiles/profile.service';
import {JhiLanguageHelper, Principal, LoginModalService, LoginService, ResponseWrapper} from '../../shared';
import {VERSION} from '../../app.constants';
import * as $ from 'jquery';
import {ContactService} from '../../entities/contact/contact.service';
import {Contact} from '../../entities/contact';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    contact: Contact;
    eventSubscriber: Subscription;
    isShippingState: boolean;

    constructor(private loginService: LoginService,
                private languageService: JhiLanguageService,
                private languageHelper: JhiLanguageHelper,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private profileService: ProfileService,
                private router: Router,
                private contactService: ContactService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.isShippingState = false;
    }

    fixNavbarCollapse() {
        $('.jh-navbar-toggler').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        })
    }

    animateOnScroll() {
        $(window).scroll(function() {
            if ($(document).scrollTop() > 30) {
                $('nav').addClass('lower');
                $('.toolbar').hide();
                $('.navbar-desk').removeClass('slidedown').addClass('slideup');

            } else {
                $('.navbar-desk').removeClass('slideup').addClass('slidedown');
                $('nav').removeClass('lower');
                $('.toolbar').show(900);
            }
        });
    }

    ngOnInit() {
        this.animateOnScroll();
        this.fixNavbarCollapse();
        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        this.loadData();
        this.changeActiveOnStartCar();
        this.registerChangeInContact();
        this.registerChangeInState();
    }

    changeActiveOnStartCar(){
        this.isShippingState = this.router.url.split('/')[1] === 'car-shipping' || this.router.url.split('/')[1] === 'car';
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    loadData() {
        this.contactService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contact = res.json[0];
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    registerChangeInContact() {
        this.eventSubscriber = this.eventManager.subscribe('contactModification', (response) => this.loadData());
    }

    registerChangeInState() {
        this.router.events.filter((event) => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            const splittedUrl = event.url.split('?')[0].split('/')[1];
            this.isShippingState = splittedUrl === 'car-shipping' || splittedUrl === 'car';
        })
    }

    toggleActiveClass() {
        this.isShippingState = !this.isShippingState;
    }

    private onError(error) {
        if (error) {
            this.jhiAlertService.error(error.message, null, null);
        }
    }

}
