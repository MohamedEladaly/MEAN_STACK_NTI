import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,private _router:Router) {}
   login(data:any):Observable<any>{
    return this._http.post("http://localhost:3000/user/login",data)
   }
   register(data :any):Observable<any>{
   return this._http.post("http://localhost:3000/user/signup",data)
   }
  
}
