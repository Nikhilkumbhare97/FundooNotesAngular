import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  fundooUrl = environment.baseurl
 
  constructor(private httpService: HttpServiceService) { }

  createNote(data: any, id: any) {
    let options = {
      headers: new HttpHeaders({
        'Authorization': id,
        'Content-type': 'application/json',
        'Accept': 'application/json'        
      })
    }

    return this.httpService.Post(`${this.fundooUrl}notes/addNotes`, data, options);
  }

}
