import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/* use those apis to get user geolocations and nationality all apis accept get request
https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en
returns all countries with country codes
*********
https://api.ipify.org/?format=json
returns users ip adress
*********
use ip adress to get user geo location and country
https://ipapi.co/${ip-adress}/json/
*/

@Injectable({
  providedIn: 'root'
})
export class MyApisService {

  userName:string = '';

  constructor(private _HttpClient:HttpClient) { }

  getUserGeolocationAndNationality():Observable<any> {
    return this._HttpClient.get(`https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en`);
  }

  getUserIP():Observable<any> {
    return this._HttpClient.get(`https://api.ipify.org/?format=json`);
  }

  getUserGeolocation(ip:any):Observable<any> {
    return this._HttpClient.get(`https://ipapi.co/${ip}/json/`);
  }
}
