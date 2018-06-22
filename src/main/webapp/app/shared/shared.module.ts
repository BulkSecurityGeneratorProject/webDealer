import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';



import {
    WebDealerSharedLibsModule,
    WebDealerSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective
} from './';
import {LOGIN_ROUTE} from './login/login.route';
import {RouterModule} from '@angular/router';

const ENTITY_STATES = [
    LOGIN_ROUTE
];

@NgModule({
    imports: [
        WebDealerSharedLibsModule,
        WebDealerSharedCommonModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        WebDealerSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class WebDealerSharedModule {}
