import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyApisService } from 'src/app/services/my-apis.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryName } from 'src/app/interfaces/countryName.interface';
import { IPAddress } from 'src/app/interfaces/ipAddress.interface';
import { UserData } from 'src/app/interfaces/userData.interface';

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

  //Function to get all countries:
  getUserGeolocationAndNationality() {
    this.Api.getUserGeolocationAndNationality().subscribe((response) => {
      response.forEach((element:any) => {
        this.allCountries.push(element.countryName) 
      });
      this.getUserIP();
    });
  };

 //Function to get user IP Address:
  getUserIP() {
    this.Api.getUserIP().subscribe((response) => {
      this.IPAddress = <IPAddress>response.ip;
      this.getUserGeolocation(this.IPAddress);
    });
  };

  //Function to get user geolocation:
  getUserGeolocation(ip:any) {
      this.Api.getUserGeolocation(ip).subscribe((response) => {
        this.currentUserCountry = <CountryName>response.country_name;
        this.selectedCountry = this.allCountries.find((country:any) => country == this.currentUserCountry)
      });
    };

    //Sign Up Form Group:
    signUpData = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9-()]*')]),
      confirmPassword: new FormControl(null, [Validators.required]),
      ip: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required])
    });

    //Sign Up Submit Function:
    signUp(form:UserData) {
      this.Api.userName = form.name;
      localStorage.setItem('Token', this.Api.userName);
      this._Router.navigate(['welcome']);
    };

    //Disable writing arabic characters in name input:
    disableWritingArabic(event: any) {
    const stringAllow = /[a-zA-Z0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!stringAllow.test(inputChar)) {
      event.preventDefault();
    }
  }

  //Check if confirm password == password:
  checkPasswordMatch(e:any) {
      if(e.target.value == this.signUpData.controls['password'].value) {
        this.passwordMatch = true;
      } else {
        this.passwordMatch = false;
      }
    };
};