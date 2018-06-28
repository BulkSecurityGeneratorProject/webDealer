import {Route} from '@angular/router';
import {UserRouteAccessService} from '../../../shared/auth/user-route-access-service';
import {CarouselPopupComponent} from './carousel-dialog.component';

export const carouselPopupRoute: Route = {
    path: 'carousel/edit',
    component: CarouselPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
};
