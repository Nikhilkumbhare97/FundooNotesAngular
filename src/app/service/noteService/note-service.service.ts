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

  getAllNotes(id: any) {
    let options = {
      headers: new HttpHeaders({
        'Authorization': id,
        'Content-type': 'application/json'
      })
    }
    return this.httpService.Get(`${this.fundooUrl}notes/getNotesList`, options)
  }

  updateNotes(data: any, id: any) {
    let options = {
      headers: new HttpHeaders({
        'Authorization': id,
        'Content-type': 'application/json',
        'Accept': 'application/json'

      })
    }
    return this.httpService.Post(`${this.fundooUrl}notes/updateNotes`, data, options)
  }

  deleteForever(data: any, id: any){
    let options = {
      headers: new HttpHeaders({
        'Authorization': id,
        'Content-type': 'application/json',
        'Accept': 'application/json'
      })
    }
    return this.httpService.Post(`${this.fundooUrl}notes/deleteForeverNotes`, data, options);
  }

  moveToArchive(data: any, id: any){
    let options = {
      headers: new HttpHeaders({
        'Authorization': id,
        'Content-type': 'application/json',
        'Accept': 'application/json'
      })
    }
    return this.httpService.Post(`${this.fundooUrl}notes/archiveNotes`, data, options);
  }

  moveToTrash(note: any, id: any){
    let options = {
      headers: new HttpHeaders({
        'Authorization': id,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
      })
    }
    return this.httpService.Post(`${this.fundooUrl}notes/trashNotes`, note, options)
  }
}
