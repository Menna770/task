import { Router } from '@angular/router';
import { MyApisService } from 'src/app/services/my-apis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  constructor(private Api:MyApisService, private _Router:Router) { }

  userName:string = '';

  ngOnInit(): void {
    this.userName = this.Api.userName;
  }

  logOut() {
    localStorage.clear();
    this._Router.navigate(['signup']);
  }

}
