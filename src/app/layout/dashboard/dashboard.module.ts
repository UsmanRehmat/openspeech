import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SignupComponent } from '../../signup/signup.component';
import { SignupModule } from '../../signup/signup.module';
import { LoginModule } from '../../login/login.module';
import { LoginComponent } from '../../login/login.component';
import { AudioRecordingService } from '../../shared/services/audio-recording.service';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        SignupModule,
        LoginModule,
        MatProgressSpinnerModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    providers:[AudioRecordingService],
    declarations: [DashboardComponent],
    entryComponents:[SignupComponent,LoginComponent]
})
export class DashboardModule {}
