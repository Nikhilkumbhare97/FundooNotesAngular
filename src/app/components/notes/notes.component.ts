import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  AllNotes: any[] = [];
  constructor(private noteService: NoteServiceService) { }

  clicked = false;

  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes() {
    let id = localStorage.getItem('id')
    this.noteService.getAllNotes(id).subscribe((resp: any) => {
      console.log(resp.data.data);
      this.AllNotes = resp.data.data.filter(this.noteFilteration);
    }, (error: any) => {
      console.log(error);
    });
  }

  messageReceived() {
    console.log("Event called from take note");
    this.getAllNotes();
  }

  refreshAfterUpdation(event: any) {
    if (event === 'update') {
      console.log('refreshed');
      this.getAllNotes();
    }
    else {
      console.log("update failure");
    }
  }
  private noteFilteration(note: any) {
    return note.isArchived == false && note.isDeleted == false;
  }

}

