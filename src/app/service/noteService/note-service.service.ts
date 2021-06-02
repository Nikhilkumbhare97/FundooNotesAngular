import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  fundooUrl = environment.baseurl
  headers = new HttpHeaders()
  .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT')); 
  options = { headers: this.headers };
  constructor(private httpService: HttpServiceService) { }

  createNote(data: any) {

    return this.httpService.Post(`${this.fundooUrl}notes/addNotes`, data, this.options);
  }

}
