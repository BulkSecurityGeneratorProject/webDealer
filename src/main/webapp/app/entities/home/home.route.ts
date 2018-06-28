import {Route, Routes} from '@angular/router';

import { HomeComponent } from './';
import {HomePopupComponent} from './home-dialog-component';
import {UserRouteAccessService} from '../../shared/auth/user-route-access-service';

export const HOME_ROUTE: Routes = [{
    path: 'home',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
},
    {
        path: 'home/edit',
        component: HomePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'webDealerApp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }];
