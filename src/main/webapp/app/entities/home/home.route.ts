import {Routes} from '@angular/router';

import { HomeComponent } from './';
import {HomePopupComponent} from './home-dialog-component';
import {UserRouteAccessService} from '../../shared';

export const homeRoute: Routes = [
    {
      path: '',
      component: HomeComponent,
      data: {
          pageTitle: 'home.title'
      }
    }
];


export const homePopupRoute: Routes = [
    {
        path: 'home/edit',
        component: HomePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'webDealerApp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
