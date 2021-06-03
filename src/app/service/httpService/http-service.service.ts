import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  constructor(private httpclient: HttpClient) { }

  Post(url: string, data: any, options : any) {
    console.log(options)
    return this.httpclient.post(url, data, options)
  }

  Get(url: string, options : any) {
    return this.httpclient.get(url, options)
  }
}
