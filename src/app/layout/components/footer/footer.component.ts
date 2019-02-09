import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { SignupComponent } from '../../../signup/signup.component';
import { User } from '../../../shared/models/User';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    public pushRightClass: string;
    public isLoggedIn:boolean=false;
    dialog: MatDialog;
    name:string="";
    constructor(public router: Router, private translate: TranslateService,dialog: MatDialog) {
        this.dialog=dialog;
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
        let user:User= <User>JSON.parse(localStorage.getItem("user"));
        if(user)
        this.name=user.name;
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.removeItem("isLoggedIn");
        console.log( localStorage.getItem("isLoggedIn"));
        window.location.reload();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
    
}
