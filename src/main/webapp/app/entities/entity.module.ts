import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WebDealerContactModule } from './contact/contact.module';
import { WebDealerCarModule } from './car/car.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        WebDealerContactModule,
        WebDealerCarModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebDealerEntityModule {}
