import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { SignupComponent } from '../../signup/signup.component';
import { LoginComponent } from '../../login/login.component';
import { AudioRecordingService } from '../../shared/services/audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../shared/models/User';
import { RegistrationService } from '../../shared/services/RegistrationService';
import { AppComponent } from '../../app.component';
import { APP_CONSTANTS } from '../../shared/Constants';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    registrationService: RegistrationService;
    dialog:MatDialog;
    audioRecordingService: AudioRecordingService;
    buttonColors:string[]=["primary","accent"];
    selectedColor:string=this.buttonColors[0];
    buttonTexts:string[]=["Record","Stop"];
    selectedButton:string=this.buttonTexts[0];
    isRecord:boolean=false;
    canRecord:boolean=true;
    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];
    word="";
    user:User;
    isRecording = false;
    recordedTime;
    blobUrl;
    blobData;
    sanitizer: DomSanitizer;
    snackBar: MatSnackBar;
    counter:string;
    inProgress:boolean=false;
    isCompleted:boolean=false;
    myCount=3;
    showCounter:boolean=false;
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(registrationService: RegistrationService,dialog:MatDialog,audioRecordingService: AudioRecordingService, sanitizer: DomSanitizer, snackBar: MatSnackBar) {
        this.registrationService=registrationService;
        this.dialog=dialog;
        this.audioRecordingService=audioRecordingService;
        this.sanitizer=sanitizer;
        this.snackBar=snackBar;

        this.audioRecordingService.recordingFailed().subscribe(() => {
            this.isRecording = false;
          });
      
          this.audioRecordingService.getRecordedTime().subscribe((time) => {
            this.recordedTime = time;
          });
      
          this.audioRecordingService.getRecordedBlob().subscribe((data) => {
            this.blobData=data.blob;
            this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
          });
        let status= localStorage.getItem("isLoggedIn");
        if(status && status=="true")
        {
            this.user=<User> JSON.parse( localStorage.getItem("user"));
            this.word=this.user.content[this.user.wordcount];
            this.counter= this.user.wordcount+1+"/"+this.user.content.length;
                
            if(this.user.content.length==this.user.wordcount)
            {
                this.isCompleted=true;
                this.word="Completed...";
            }
        }
        else
        {
            this.OnLogin();
        }

    }

    OnLogin()
    {
        let dialogRef=this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe(result => {
            if(result=="true")
            {
                this.user=<User> JSON.parse( localStorage.getItem("user"));
                this.counter= this.user.wordcount+1+"/"+this.user.content.length;
                this.word=this.user.content[this.user.wordcount];
                if(this.user.content.length==this.user.wordcount)
                {
                    this.isCompleted=true;
                    this.word="Completed...";
                }
                window.location.reload();
            }
            else if("Signup")
            {
                this.OnSignUp();
            }
            else
            {
                this.OnLogin();
            }
            this.ngOnInit();
          });
    }
    OnSignUp()
    {
        let dialogRef=this.dialog.open(SignupComponent);
        dialogRef.afterClosed().subscribe(result => {
            if(result=="true")
            {
                this.OnLogin();
            }
            else
            {
                this.OnSignUp();
            }
            this.ngOnInit();
          });
    }
    ngOnInit() {}
    StartStopRecording()
    {
        if(this.isRecord)
        {
            this.stopRecording();
            this.isRecord=false;
            this.selectedButton=this.buttonTexts[0];
            this.selectedColor= this.buttonColors[0];
            this.canRecord=false;
            
        }
        else
        {
            this.startRecording();
            
            this.showCounter=true;
            let interval = setInterval(()=>{
                this.myCount--;
                if(this.myCount == 0) 
                {
                    clearInterval(interval);
                    this.showCounter=false;
                    this.myCount=3;
                    this.isRecord=true;
                }
              },1000);
            
            
            
            this.selectedButton=this.buttonTexts[1];
            this.selectedColor= this.buttonColors[1];
            
            
        }
    }
    reset()
    {
        
        this.canRecord=true;
        this.selectedColor=this.buttonColors[0];
        this.selectedButton=this.buttonTexts[0];
        this.blobUrl = null;
        this.counter= this.user.wordcount+1+"/"+this.user.content.length;
        this.word=this.user.content[this.user.wordcount];
        if(this.user.content.length==this.user.wordcount)
        {
            this.isCompleted=true;
        }

    }
    Rerecording()
    {
        this.reset();
        this.StartStopRecording();
    }
    startRecording() {
        if (!this.isRecording) {
          this.isRecording = true;
          this.audioRecordingService.startRecording();
        }
      }
    
      abortRecording() {
        if (this.isRecording) {
          this.isRecording = false;
          this.audioRecordingService.abortRecording();
        }
      }
    
      stopRecording() {
        if (this.isRecording) {
          this.audioRecordingService.stopRecording();
          this.isRecording = false;
        }
      }
    
      clearRecordedData() {
        this.blobUrl = null;
      }
    
      ngOnDestroy(): void {
        this.abortRecording();
      }
      public blobToFile = (theBlob: Blob, fileName:string): File => {
        var b: any = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;
    
        //Cast to a File() type
        return <File>theBlob;
      }
      uploadFile()
      {
        this.inProgress=true;
        let formData:FormData = new FormData();
        let file:File= this.blobToFile(this.blobData,"file");
        formData.append('email', this.user.email);
        formData.append('gender',this.user.gender );
        formData.append('wordcount',this.user.wordcount.toString() );
        formData.append('file',file,file.name);
        this.registrationService.uploadFile(formData).subscribe((res:any)=>{
            if(res.status==APP_CONSTANTS.Messages.SUCCESS)
            {
                this.user.wordcount=res.wordcount;
                localStorage.setItem("user",JSON.stringify(this.user));
                this.reset();
                
                this.snackBar.open('File upload successfully','',{
                    duration: 4000,
                  });
            }
            else
            {
                this.snackBar.open('There is some issue in uploading file.','',{
                    duration: 4000,
                  });
            }
            this.inProgress=false;
        },(error:Error)=>{
            console.log(error);
            this.inProgress=false;
        })
        // formData.append('uploadFile', , file.name);
        // let headers = new Headers();
        // /** In Angular 5, including the header Content-Type can invalidate your request */
        // headers.append('Content-Type', 'multipart/form-data');
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(`${this.apiEndPoint}`, formData, options)
        
      }
}
