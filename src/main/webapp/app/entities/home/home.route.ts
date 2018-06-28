import {Route, Routes} from '@angular/router';

import { HomeComponent } from './';
import {HomePopupComponent} from './home-dialog-component';
import {UserRouteAccessService} from '../../shared/auth/user-route-access-service';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};


export const homePopupRoute: Route = {
        path: 'home/edit',
        component: HomePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'webDealerApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    };
