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
  noteCard: any;

  @Output() refreshRequest = new EventEmitter<any>();

  constructor(private noteService : NoteServiceService) { }

  ngOnInit(): void {
  }

  deleteNote(){
    let data = {
      noteIdList: [this.noteCard.id],
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
}
