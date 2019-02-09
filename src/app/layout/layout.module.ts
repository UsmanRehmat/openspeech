import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialog,
    MatDialogModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { SignupComponent } from '../signup/signup.component';
import { SignupModule } from '../signup/signup.module';
import {FooterComponent} from './components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatDialogModule,
        TranslateModule,
        SignupModule
    ],
    declarations: [LayoutComponent, NavComponent, TopnavComponent, SidebarComponent,FooterComponent],
    entryComponents:[SignupComponent]
})
export class LayoutModule {}
