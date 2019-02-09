import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'

import { MatButtonModule, MatCheckboxModule, MatInputModule, MatAutocompleteModule, MatRadioModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {RegistrationService} from '../shared/services/RegistrationService';


@NgModule({
    imports: [
       
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SignupRoutingModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatInputModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatSelectModule
        
    ],
    providers:[],
    declarations: [SignupComponent]
})
export class SignupModule { }
