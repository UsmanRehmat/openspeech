import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {User} from '../shared/models/User';
import {RegistrationService} from '../shared/services/RegistrationService';
import {APP_CONSTANTS} from '../shared/Constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registrationService: RegistrationService;
  SignUp: FormGroup;
  userNameFormControl:FormControl;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  repeatPasswordFormControl: FormControl;
  genderFormControl: FormControl;
  ageFormControl: FormControl;
  termConditionFormControl:FormControl;
  message: string='';
  defaultMsgColor:string='green';
  msgColor:string= this.defaultMsgColor;
  genders:string[];
  selectedgender:string;
  dialogRef: MatDialogRef<SignupComponent>;
  inProgress:boolean=false;
  operation:string="Add";

  termsCondition=`The undersigned, referred to here as the “Speaker”, agrees to record and contribute speech data for Urdu Speech Corpus Development Project at the Center for Speech and Language Technologies (CSaLT), Information Technology University (ITU) (referred to here as the “Employer”). The speaker is required to participate in recording sessions on the following terms and conditions.
  
  General:	
  
  i)	The Speaker’s services will be governed by the terms of the agreement (including those in Annexure A)
  ii)	The recorded data will be used for research and development aspects of Urdu language.
  iii)	In addition, all the recorded information will be released as part of a speech corpus to the public under a license as deemed appropriate by the Employer.
  
  Annexure “A”

  COPYRIGHT AGREEMENT

  This agreement is made between the ‘Employer’ (CSaLT) and the ‘Speaker’.
  
  In consideration of the offer of engagement to the Speaker by the Employer for the purpose of working on the Project, the Speaker agrees as follows:
  
  (a)	The Speaker agrees that all information, whether or not in writing, of a private, secret or confidential nature concerning the Project, (collectively, “Proprietary Information”) is and shall be the exclusive property of the Employer. By way of illustration, but not limitation, Proprietary Information shall include inventions, products, processes, methods, techniques, formulas, compositions, compounds, projects, developments, plans, computer programs and research data. The Speaker will not disclose any Proprietary Information to any person or entity other than other researchers on the Project or use the same for any purposes (other than in the performance of his/her duties on the Project), either during or after his/her work on the Project, unless and until such Proprietary  Information has become public knowledge without fault by the Speaker or unless the Speaker is required by law to make such disclosure provided, however that the Speaker provides prior written notice of such disclosure to the Employer and takes reasonable and lawful actions to avoid and/or minimize the extent of such disclosure.
  (b)	The Speaker agrees that all information related to recorded voice in original and copy, whether or not in writing, is and shall be the exclusive property of the Employer. By way of illustration, but not limitation, this information shall include recorded voice on Digital Video/Audio Cassettes and Compact Disks, data generated from recordings, re-synthesized voice and material used during the recording sessions. The Speaker further agrees that all information related to recorded voice, in whole or in part, by the Speaker may be maintained, changed, modified, and/or adapted by the Employer without the consent of the Speaker. The Employer reserves the right to share information related to recorded voice with other third parties without the consent of the Speaker on any terms and conditions appropriate for the contractor. The Speaker forfeits all his/her rights to the above mentioned recordings.  
  (c)	The Speaker agrees that all files, letters, memoranda, reports,  record, data, recorded voice on Digital Video/Audio Cassettes and Compact Disks, data generated from recordings, re-synthesized voice, material used during the recording sessions, sketches, drawing, laboratory notebook, program listing, or other written, photographic, or other tangible material containing Proprietary Information, whether created by the Speaker or others, which shall come into his/her custody or possession, shall be and are the exclusive property of the Employer to be used by the Speaker only in the performance of his/her duties on the Project. All such materials or copies thereof and all tangible property relating to the Project in the custody or possession of the Speaker shall be delivered to the Employer, on (i) a request by the Employer or (ii) termination of his/her employment or engagement. After such delivery, the Speaker shall not retain any such material or copies thereof or any such tangible property. 
  (d)	The Speaker agrees to cooperate fully with the Employer, both during and after his/her work on the Project, with respect to the procurement, maintenance and enforcement of copyrights, patents and other intellectual property rights (in all countries) relating to Project Inventions. The Speaker shall sign all papers, including, without limitation, copyright application, patent application, declarations, oaths, formal assignments, assignments of priority rights, and powers of attorney, which the Employer may deem necessary or desirable in order to protect its rights and interests in any Development. The Speaker further agrees that if the Employer is unable, after reasonable efforts, to secure the signature of the Speaker on any such papers, any executive officer of  the Employer shall be entitled to execute any such papers as the agent and the attorney-in-fact of the Speaker, and the Speaker hereby irrevocably designates and appoints each executive officer of the Employer as his/her agent and attorney-in-fact to execute any such papers on his/her behalf, and to take any and all actions as the Employer may deem necessary or desirable in order to protect its rights and interest in any Development, under the conditions described in this sentence.`

  constructor(registrationService: RegistrationService, dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { 
    this.registrationService=registrationService;
    this.dialogRef=dialogRef;

    this.genders= APP_CONSTANTS.gender;
    
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
      this.validateEmail
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern('^.{8,}$')
    ]);
    this.repeatPasswordFormControl = new FormControl('', [
      Validators.required
      
    ]);
    this.genderFormControl = new FormControl('M', [
      Validators.required
      
    ]);
    this.userNameFormControl= new FormControl('',[
      Validators.required
    ]);

    this.ageFormControl= new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]);
    this.termConditionFormControl= new FormControl('',[
      Validators.required
    ])
    
    this.SignUp= new FormGroup({
      emailFormControl: this.emailFormControl,
      passwordFormControl: this.passwordFormControl,
      repeatPasswordFormControl: this.repeatPasswordFormControl,
      genderFormControl:this.genderFormControl,
      userNameFormControl:this.userNameFormControl,
      ageFormControl:this.ageFormControl,
      termConditionFormControl:this.termConditionFormControl
    },[this.confirmPasswordvalidator]);

    if(this.data!=null)
    {
      this.setFormValuesFromModel(data);
      this.UpdateGender();
      this.operation="Update";
    }
  }
  ngOnInit() {
  
  }
  reset()
  {
      this.msgColor=this.defaultMsgColor;
      this.SignUp.reset();
      this.message='';
  }
  confirmPasswordvalidator(control:FormControl): { [s:string] : boolean}
  {   
    if(control.get('passwordFormControl').value=== control.get('repeatPasswordFormControl').value)
    {
      return null;
    }
    control.get('repeatPasswordFormControl').setErrors({'mismatch': true});
    return {mismatch:true}
  
  }
  validateEmail(control:FormControl):{ [s:string] : boolean} { 
      if(control && control.value.indexOf("@itu.edu.pk") !== -1){
        //VALID
        return null;
      }
      return {'@itu.edu.pk':true}
    }
  OnSignUp()
  {
    if(this.operation==="Add")
    {
      this.register();
    }
    else
    {
      this.UpdateUser();
    }
  }
  LogIn()
  {
    this.CloseDialog();
  }
  register(){
    //clear message if exist
    this.inProgress=true;
    let user= this.getModelFromFormValues(this.SignUp.value)
    this.registrationService.register(user).subscribe((res:any)=>{
      if(res.status==APP_CONSTANTS.Messages.SUCCESS)
      {
        this.message="You are registered sucessfully.";
        this.CloseDialog();
      }
      else
      {
        this.msgColor=APP_CONSTANTS.MessageColors.Error;
        this.message=res;
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
  UpdateUser(){
    //clear message if exist
    this.inProgress=true;
    let user= this.getModelFromFormValues(this.SignUp.value)
    this.registrationService.update(user).subscribe((res:boolean)=>{
      if(res==true)
      {
        this.message="update user sucessfully.";
        this.dialogRef.close("true");
      }
      else
      {
        this.msgColor=APP_CONSTANTS.MessageColors.Error;
        this.message="unable to update user";
      }
      //here
      this.inProgress=false;
    },
    (error:any)=>
    {
      console.log(error);
      this.message="Invalid request.";
      //here
      this.inProgress=false;
    });
  }
  CloseDialog():void
  {
    this.dialogRef.close("true");
  }
  getModelFromFormValues(signupForm : any): User
  {
    let user: User= new User();
    user.name= signupForm.userNameFormControl;
    user.email=signupForm.emailFormControl;
    user.password= signupForm.passwordFormControl;
    user.gender= signupForm.genderFormControl;
    user.age=signupForm.ageFormControl;
    return user;
  }
  setFormValuesFromModel(user : User): void
  {
    this.userNameFormControl.setValue(user.name);
    this.emailFormControl.setValue(user.email);
    this.passwordFormControl.setValue(user.password);
    this.repeatPasswordFormControl.setValue(user.password);
    this.genderFormControl.setValue(user.gender);
    this.ageFormControl.setValue(user.age);    
  }
  
  UpdateGender()
  {
    this.selectedgender=this.genderFormControl.value;
    
  }
}
