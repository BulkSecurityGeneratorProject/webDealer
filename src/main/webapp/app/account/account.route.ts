import { Routes } from '@angular/router';

import {
    passwordRoute,
    settingsRoute
} from './';

const ACCOUNT_ROUTES = [
    passwordRoute,
    settingsRoute
];

export const accountState: Routes = [{
    path: 'account',
    children: ACCOUNT_ROUTES
}];
