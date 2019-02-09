import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {Location} from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import {APP_CONSTANTS} from '../Constants';
import { error } from 'util';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private httpClient:HttpClient;
  private location : Location;
 

  constructor(httpClient: HttpClient, location:Location)
  { 
    this.httpClient=httpClient;
    this.location=location;
  
  }
  login(user:User ):Observable<User>
  {
    const url= "/api"+APP_CONSTANTS.APIConfig.Services.Registration.Actions.login;
    const body=user;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return  this.httpClient.post(url,JSON.stringify(body),httpOptions).pipe(
      map((res:User)=>
      {
        return res;
      })
    );    
  }
  getAll():Observable<User[]>
  {
    const url="/api"+ APP_CONSTANTS.APIConfig.Services.Registration.Actions.getAll;
    return  this.httpClient.get(url).pipe(
      map((res:User[])=>
      {
        return res;
      })
    );    
  }
  register(user : User) : Observable<string>
  {
    const url="/api"+ APP_CONSTANTS.APIConfig.Services.Registration.Actions.register;
    const body=user;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return  this.httpClient.post(url,JSON.stringify(body),httpOptions).pipe(
      map((res:string)=>
      {
        return res;
      })
    );  
  }
  uploadFile(formData : FormData) : Observable<any>
  {
    const url="/api"+ APP_CONSTANTS.APIConfig.Services.Registration.Actions.upload;
    const body=formData;
    
    return  this.httpClient.post(url,body).pipe(
      map((res:any)=>
      {
        return res;
      })
    );  
  }
  update(user : User) : Observable<boolean>
  {
    const url=  APP_CONSTANTS.APIConfig.Services.Registration.Actions.update;
    const body=user;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }) 
    };
    return  this.httpClient.post(url,JSON.stringify(body),httpOptions).pipe(
      map((res:boolean)=>
      {
        return res;
      })
    );  
  }
  delete(user : User) : Observable<boolean>
  {
    const url=  APP_CONSTANTS.APIConfig.Services.Registration.Actions.delete;
    const body=user;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }) 
    };
    return  this.httpClient.post(url,JSON.stringify(body),httpOptions).pipe(
      map((res:boolean)=>
      {
        return res;
      })
    );  
  }
}
