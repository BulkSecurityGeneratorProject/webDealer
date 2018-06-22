import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Contact} from '../../entities/contact/contact.model';
import {ContactService} from '../../entities/contact/contact.service';
import {ResponseWrapper} from '../../shared';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html',
    styleUrls: [
        'footer.scss'
    ]
})
export class FooterComponent implements OnInit {
    eventSubscriber: Subscription;
    contact: Contact;
    constructor(private contactService: ContactService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager) {}
    ngOnInit(): void {
        this.loadData();
        this.registerChangeInContact();
    }
    loadData() {
        this.contactService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contact = res.json[0];
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    registerChangeInContact() {
        this.eventSubscriber = this.eventManager.subscribe('contactModification', (response) => this.loadData());
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
