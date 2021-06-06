import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input()
  isArchive: any

  @Input() 
  isTrash: any
  
  @Input()
  card: any;
 
  @Output() refreshRequest = new EventEmitter<any>();

  constructor(private noteService : NoteServiceService) { }

  ngOnInit(): void {
  
  }

  deleteNote(){
    console.log(this.card)
    let data = {
      noteIdList: [this.card.id],
      isDeleted: false,
    };
    console.log(data);
    
    let id = localStorage.getItem('id')
    this.noteService.deleteForever(data, id).subscribe((res) => {
      console.log(res);
      this.refreshRequest.emit({ refresh: true, message: 'deleted permanently' });
    }, (error) => {
      console.log(error)
    })
  }

  archiveNote() {
    let data = {
      noteIdList: [this.card.id],
      isArchived: true
    };
    console.log(data);
    
    let id = localStorage.getItem('id')
    this.noteService.moveToArchive(data, id).subscribe((res) => {
      console.log(res);
      this.refreshRequest.emit({ refresh: true, message: 'archived' });
    }, (error) => {
      console.log(error)
    })
  }

  addToTrash() {
    let token = localStorage.getItem('id')
    console.log(token)
    let data = {
      noteIdList: [this.card.id],
      isDeleted: true
    }
    console.log(data)
    this.noteService.moveToTrash(data, token).subscribe((res) => {
      console.log(res)
      this.refreshRequest.emit({ refresh: true, message: 'deleted' })
    }, (error) => {
      console.log(error)
    })
  }
}
