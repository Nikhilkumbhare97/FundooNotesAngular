import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: 'app-get-trash-notes',
  templateUrl: './get-trash-notes.component.html',
  styleUrls: ['./get-trash-notes.component.scss']
})
export class GetTrashNotesComponent implements OnInit {

  AllNotes: any[] = [];
  public isTrash=true;

  @Input()
  notesArray: any[] = [];

  @Input()
  noteCard: any;
  @Output() refreshRequest = new EventEmitter<any>();
  constructor(private noteService: NoteServiceService) { }

  ngOnInit(): void {
    this.getAllTrash()
  }

  getAllTrash(){
    let id = localStorage.getItem('id')
    this.noteService.getTrash(id).subscribe((res: any)=>{
      console.log(res.data.data)
      this.AllNotes = res.data.data.filter(this.filterNotes).reverse();
    },(error)=> {
      console.log(error)
    })
  }
  private filterNotes(note: any){
    return note.isDeleted == true;
  }
  refreshAfterUpdation(event: any) {
    if (event === 'deleted') {
      console.log('refreshed');
      this.getAllTrash();
    }
    else {
      console.log("update failure");
    }
  }

}
