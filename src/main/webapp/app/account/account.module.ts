import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebDealerSharedModule } from '../shared';

import {
    PasswordService,
    PasswordStrengthBarComponent,
    PasswordComponent,
    SettingsComponent,
    accountState
} from './';

@NgModule({
    imports: [
        WebDealerSharedModule,
        RouterModule.forChild(accountState)
    ],
    declarations: [
        PasswordComponent,
        PasswordStrengthBarComponent,
        SettingsComponent
    ],
    providers: [
        PasswordService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerAccountModule {}
