import { Route } from '@angular/router';
import {JhiLoginModalComponent} from './login.component';

export const LOGIN_ROUTE: Route = {
    path: 'administrator',
    component: JhiLoginModalComponent,
    data: {
        authorities: [],
        pageTitle: 'login.title'
    }
};
