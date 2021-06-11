import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: 'app-get-archive-notes',
  templateUrl: './get-archive-notes.component.html',
  styleUrls: ['./get-archive-notes.component.scss']
})
export class GetArchiveNotesComponent implements OnInit {

  AllNotes: any[] = [];
  isArchive=true;

  @Input()
  card: any;
  @Output() refreshRequest = new EventEmitter<any>();
  constructor(private noteService: NoteServiceService) { }

  ngOnInit(): void {
   
    this.getArchives();
  }
  getArchives(){
    let id = localStorage.getItem('id')
    this.noteService.getArchive(id).subscribe((res: any)=> {
      console.log(res.data.data)
      this.AllNotes = res.data.data.filter(this.filterNotes).reverse();
    }, (error)=> {
      console.log(error)
    })
  }
  private filterNotes(note: any){
    return note.isArchived == true;
  }
  refreshAfterUpdation(event: any) {
    if (event === 'archived') {
      console.log('refreshed');
      this.getArchives();
    }
    else {
      console.log("update failure");
    }
  }
  check() : any {
    if(this.AllNotes != null)
      return true;
    
  }
}
