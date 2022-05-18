import { Component, OnInit } from '@angular/core';
import { MyApisService } from 'src/app/services/my-apis.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private Api:MyApisService, private _Router:Router) { }

  ngOnInit(): void {
    this.getUserGeolocationAndNationality();
  }

  IPAddress:any;
  allCountries: any = [];
  currentUserCountry:any;
  selectedCountry:any;
  passwordMatch: boolean = true;

  getUserGeolocationAndNationality() {
    this.Api.getUserGeolocationAndNationality().subscribe((response) => {
      response.forEach((element:any) => {
        this.allCountries.push(element.countryName) 
      });
      this.getUserIP();
    });
  };

  getUserIP() {
    this.Api.getUserIP().subscribe((response) => {
      this.IPAddress = response.ip;
      this.getUserGeolocation(this.IPAddress);
    });
  };

  getUserGeolocation(ip:any) {
      this.Api.getUserGeolocation(ip).subscribe((response) => {
        this.currentUserCountry = response.country_name;
        this.selectedCountry = this.allCountries.find((country:any) => country == this.currentUserCountry)
      });
    };

    signUpData = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9-()]*')]),
      confirmPassword: new FormControl(null, [Validators.required]),
      ip: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required])
    });

    signUp(form:any) {
      this.Api.userName = form.value.name;
      localStorage.setItem('Token', this.Api.userName);
      this._Router.navigate(['welcome']);
    };

    checkPasswordMatch(e:any) {
      if(e.target.value == this.signUpData.controls['password'].value) {
        this.passwordMatch = true;
      } else {
        this.passwordMatch = false;
      }
    };
};
