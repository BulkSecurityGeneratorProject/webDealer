import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper } from '../../shared';
import {NgwWowService} from 'ngx-wow';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: [
        'main.scss'
    ]
})
export class JhiMainComponent implements OnInit {

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private wowService: NgwWowService
    ) {
        this.router.events.filter((event) => event instanceof NavigationEnd).subscribe((event) => {
            // Reload WoW animations when done navigating to page,
            // but you are free to call it whenever/wherever you like
            this.wowService.init();
        });
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'webDealerApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }
}
