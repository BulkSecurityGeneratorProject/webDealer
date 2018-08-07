import {Routes} from '@angular/router';
import {UserRouteAccessService} from '../../../shared';
import {CarouselPopupComponent} from './carousel-dialog.component';

export const carouselPopupRoute: Routes = [
    {
        path: 'carousel/edit',
        component: CarouselPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
