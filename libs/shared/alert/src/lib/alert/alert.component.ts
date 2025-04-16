import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService, Alert } from './alert.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
    alert!: Alert;
    staticAlertClosed = false;
    subs!: Subscription;

    constructor(private alertService: AlertService) {}

    ngOnInit(): void {
        this.subs = this.alertService.alert$.subscribe((alert) => {
            this.alert = alert;
            this.staticAlertClosed = false;
            setTimeout(() => (this.staticAlertClosed = true), 6000);
        });
    }

    ngOnDestroy(): void {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }
}
