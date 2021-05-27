import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  constructor(private httpclient: HttpClient) { }

  Post(url: string, data: any, isHeaderRequired: any = false, headers = null) {
    return this.httpclient.post(url, data, isHeaderRequired && headers)
  }

  Get(url: string, isHeaderRequired: any = false, headers = null) {
    return this.httpclient.get(url, isHeaderRequired && headers)
  }
}
