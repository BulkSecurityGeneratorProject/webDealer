import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { WebDealerSharedModule, UserRouteAccessService } from './shared';
import { WebDealerAppRoutingModule} from './app-routing.module';
import { WebDealerHomeModule } from './home';
import { WebDealerAdminModule } from './admin/admin.module';
import { WebDealerAccountModule } from './account/account.module';
import { WebDealerEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import {NgwWowModule} from 'ngx-wow';

@NgModule({
    imports: [
        BrowserModule,
        WebDealerAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        WebDealerSharedModule,
        WebDealerHomeModule,
        WebDealerAdminModule,
        WebDealerAccountModule,
        WebDealerEntityModule,
        NgwWowModule.forRoot()
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        ActiveMenuDirective,
        FooterComponent,
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService,
    ],
    bootstrap: [ JhiMainComponent ]
})
export class WebDealerAppModule {}
