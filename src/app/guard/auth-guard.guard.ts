import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardGuard implements CanActivate {
  
  constructor(private _Router:Router) {}

  getToken() {  
    return !!localStorage.getItem("Token");  
  } 

  canActivate() {
    if(!this.getToken()) {  
      this._Router.navigateByUrl("/signup");  
  }  
    return this.getToken();  
  }
  
}
