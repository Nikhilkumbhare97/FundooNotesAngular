import { Injectable } from '@angular/core';
import { HttpServiceService} from '../httpService/http-service.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  encode(data : any) {
    const formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  fundooUrl = environment.baseurl
  constructor(private httpservice: HttpServiceService) { }

  registerUser(data: any) {
    return this.httpservice.Post(`${this.fundooUrl}user/userSignUp`, data , "")
  }

  loginToFundoo(data: any) {
    return this.httpservice.Post(`${this.fundooUrl}user/login`, data, "")
  }

  forgotPassword(data: any) {
    return this.httpservice.Post(`${this.fundooUrl}user/reset`, data, "")
  }

  resetPassword(data: any , token : any) {

   
      const httpoptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': localStorage.getItem('access') }) }
   

    console.log(token)
  
    return this.httpservice.Post(`${this.fundooUrl}user/reset-password`, this.encode(data), httpoptions)
  }
}

