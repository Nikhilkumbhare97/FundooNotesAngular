import { Injectable } from '@angular/core';
import { HttpServiceService} from '../httpService/http-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  fundooUrl = environment.baseurl
  constructor(private httpservice: HttpServiceService) { }

  registerUser(data: any) {
    return this.httpservice.Post(`${this.fundooUrl}user/userSignUp`, data)
  }

  loginToFundoo(data: any) {
    return this.httpservice.Post(`${this.fundooUrl}user/login`, data)
  }
}
