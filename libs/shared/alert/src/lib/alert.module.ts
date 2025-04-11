import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './alert/alert.service';
import { AlertComponent } from './alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, NgbModule],
    exports: [AlertComponent],
    declarations: [AlertComponent],
    providers: [AlertService]
})
export class AlertModule {}
