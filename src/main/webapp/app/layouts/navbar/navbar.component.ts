import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiLanguageService} from 'ng-jhipster';

import {ProfileService} from '../profiles/profile.service';
import {JhiLanguageHelper, Principal, LoginModalService, LoginService} from '../../shared';
import {VERSION} from '../../app.constants';
import * as $ from 'jquery';

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

    constructor(private loginService: LoginService,
                private languageService: JhiLanguageService,
                private languageHelper: JhiLanguageHelper,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private profileService: ProfileService,
                private router: Router) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
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

}
