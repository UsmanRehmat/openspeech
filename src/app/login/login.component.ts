import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {User} from '../shared/models/User';
import {RegistrationService} from '../shared/services/RegistrationService';
import {APP_CONSTANTS} from '../shared/Constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registrationService: RegistrationService;
  Login: FormGroup;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  message: string='';
  defaultMsgColor:string='green';
  msgColor:string= this.defaultMsgColor;
  genders:string[];
  selectedgender:string;
  dialogRef: MatDialogRef<LoginComponent>;
  inProgress:boolean=false;
  operation:string="Add";
  constructor(registrationService: RegistrationService, dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { 
    this.registrationService=registrationService;
    this.dialogRef=dialogRef;

    
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required
    ]);
    
    this.Login= new FormGroup({
      emailFormControl: this.emailFormControl,
      passwordFormControl: this.passwordFormControl,
    });

  }
  ngOnInit() {
  
  }
  OnLogin()
  {
    this.logIn();
  }
  logIn(){
    //clear message if exist
    this.inProgress=true;
    let user= this.getModelFromFormValues(this.Login.value)
    this.registrationService.login(user).subscribe((res:User)=>{
      if(res.status===APP_CONSTANTS.Messages.SUCCESS)
      {
        this.message="You are Logged In successfully.";
        localStorage.setItem("isLoggedIn","true");
        localStorage.setItem("user",JSON.stringify(res));
        this.dialogRef.close("true");
      }
      else
      {
        this.msgColor=APP_CONSTANTS.MessageColors.Error;
        this.message=res.status;
      }
      //here
      this.inProgress=false;
    },
    (error:any)=>
    {
      console.log(error);
      this.msgColor=APP_CONSTANTS.MessageColors.Error;
      this.message="Invalid request.";
      //here
      this.inProgress=false;
    });
  }
  Signup()
  {
    this.dialogRef.close("Signup");  
  }
  CloseDialog():void
  {
    this.dialogRef.close();
  }
  getModelFromFormValues(LoginForm : any): User
  {
    let user: User= new User();
    user.email=LoginForm.emailFormControl;
    user.password=LoginForm.passwordFormControl;
    return user;
  }
  setFormValuesFromModel(user : User): void
  {
    this.emailFormControl.setValue(user.name);
    this.passwordFormControl.setValue(user.password);
  }
 
}
