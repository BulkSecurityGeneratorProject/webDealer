import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-contact',
    templateUrl: './contact.component.html',
    styleUrls: [
        'contact.scss'
    ]
})
export class ContactComponent implements OnInit, OnDestroy {
    contact: Contact;
    currentAccount: any;
    eventSubscriber: Subscription;
    title = 'My first AGM project';
    lat = 51.678418;
    lng = 7.809007;

    constructor(
        private contactService: ContactService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.contactService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contact = res.json[0];
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Contact) {
        return item.id;
    }
    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe('contactListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
