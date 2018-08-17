import {HomeComponent} from '../home';
import {Route, Routes} from '@angular/router';
import {ProcedureComponent} from './procedure.component';
import {UserRouteAccessService} from '../../shared';
import {HomePopupComponent} from '../home/home-dialog-component';
import {ProcedurePopupComponent} from './procedure-dialog.component';

export const procedureRoute: Route = {
        path: 'procedure',
        component: ProcedureComponent,
        data: {
            pageTitle: 'webDealerApp.procedure.home.title'
        }
    };
export const procedurePopupRoute: Route = {
        path: 'procedure/edit',
        component: ProcedurePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'webDealerApp.procedure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    };
